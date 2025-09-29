import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Check, X } from 'lucide-react';
import { terminologyAPI } from '../../api/api';

/**
 * AutoComplete Component
 * 
 * Purpose: Searchable dropdown for NAMASTE/ICD terminology with debounced search
 * 
 * Features:
 * - Debounced search input with loading states
 * - Keyboard navigation (arrow keys, enter, escape)
 * - Accessibility support with ARIA attributes
 * - Search results with NAMASTE and ICD codes
 * - Translate functionality for code mapping
 * - Customizable placeholder and styling
 * - Error handling and empty states
 */
const AutoComplete = ({ 
  placeholder = "Search NAMASTE/ICD codes...",
  onSelect,
  onTranslate,
  className = "",
  disabled = false
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const inputRef = useRef(null);
  const listRef = useRef(null);
  const debounceRef = useRef(null);

  // Debounced search function
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      await performSearch(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Perform search
  const performSearch = async (searchQuery) => {
    try {
      setIsLoading(true);
      setError(null);

      await terminologyAPI.search(searchQuery);
      
      // Mock data for demonstration (replace with actual API response)
      const mockResults = [
        {
          id: 1,
          namasteCode: 'NAMASTE-001',
          namasteName: 'Diabetes Mellitus Type 2',
          icdCode: 'E11',
          icdName: 'Type 2 diabetes mellitus',
          category: 'Endocrine disorders',
          description: 'A chronic condition that affects the way the body processes blood sugar'
        },
        {
          id: 2,
          namasteCode: 'NAMASTE-002',
          namasteName: 'Hypertension',
          icdCode: 'I10',
          icdName: 'Essential hypertension',
          category: 'Cardiovascular diseases',
          description: 'High blood pressure condition'
        },
        {
          id: 3,
          namasteCode: 'NAMASTE-003',
          namasteName: 'Acute Myocardial Infarction',
          icdCode: 'I21',
          icdName: 'ST elevation myocardial infarction',
          category: 'Cardiovascular diseases',
          description: 'Heart attack caused by blockage of blood flow to the heart'
        }
      ].filter(item => 
        item.namasteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.icdName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.namasteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.icdCode.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setResults(mockResults);
      setIsOpen(true);
      setSelectedIndex(-1);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search terminology');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedItem(null);
  };

  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setQuery(item.namasteName);
    setIsOpen(false);
    onSelect && onSelect(item);
  };

  // Handle translate
  const handleTranslate = async (item) => {
    try {
      setIsLoading(true);
      setError(null);

      await terminologyAPI.translate(item.namasteCode);
      
      // Mock translation response
      const translatedItem = {
        ...item,
        translatedIcdCodes: [
          { code: 'E11', name: 'Type 2 diabetes mellitus' },
          { code: 'E11.9', name: 'Type 2 diabetes mellitus without complications' }
        ]
      };

      onTranslate && onTranslate(translatedItem);
    } catch (err) {
      console.error('Translation error:', err);
      setError('Failed to translate code');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleItemSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Clear selection
  const handleClear = () => {
    setQuery('');
    setSelectedItem(null);
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Focus input
  const handleFocus = () => {
    if (results.length > 0) {
      setIsOpen(true);
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-4 w-4 text-gray-400" />
          )}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          disabled={disabled}
          placeholder={placeholder}
          className={`input-field pl-10 pr-10 ${disabled ? 'bg-gray-50' : ''}`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          role="combobox"
          aria-describedby="search-results"
        />
        
        {query && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          <div
            ref={listRef}
            role="listbox"
            id="search-results"
            aria-label="Search results"
          >
            {results.length > 0 ? (
              results.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-4 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                    index === selectedIndex
                      ? 'bg-mint-50 border-mint-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleItemSelect(item)}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">
                          {item.namasteName}
                        </h4>
                        <span className="px-2 py-1 text-xs font-medium bg-mint-100 text-mint-800 rounded-full">
                          {item.namasteCode}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="text-sm text-gray-600">
                          {item.icdName}
                        </p>
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {item.icdCode}
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-500 mb-2">
                        {item.category}
                      </p>
                      
                      <p className="text-sm text-gray-700">
                        {item.description}
                      </p>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTranslate(item);
                      }}
                      className="ml-3 px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200"
                      title="Translate to ICD codes"
                    >
                      Translate
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>No results found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Selected Item Display */}
      {selectedItem && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Selected: {selectedItem.namasteName}
            </span>
          </div>
          <div className="text-xs text-green-700">
            <p>NAMASTE: {selectedItem.namasteCode}</p>
            <p>ICD: {selectedItem.icdCode} - {selectedItem.icdName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
