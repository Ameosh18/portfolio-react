import StackedGallery from '../components/StackedGallery'

export default function WorkPage() {
  return (
    <div style={{ height: "400vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <StackedGallery />
      </div>
    </div>
  )
}
