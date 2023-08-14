import ImageGallery from "../components/ImageGallery";

export default function Home() {
  return (
    <div data-test-id="component-app" className="bg-nasa">
      <ImageGallery />
    </div>
  )
}
