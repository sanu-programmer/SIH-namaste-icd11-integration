const ImageSlider = () => {
  const images = [
    "/Banner 1 Modi ji.jpg",
    "/bimar bhacha.jpeg",
    "/gande bache.jpeg",
    "/Ayurved doc.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: `${(index - currentIndex) * 100}%`,
            transition: "left 0.8s ease-in-out",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
        }}
      >
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background:
                index === currentIndex ? "#fff" : "rgba(255,255,255,0.6)",
              cursor: "pointer",
              border: "2px solid #333",
            }}
          />
        ))}
      </div>
    </div>
  );
};
