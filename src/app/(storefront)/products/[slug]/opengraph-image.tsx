import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'Manevia Luxury Wigs';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
 
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Format slug to readable name
  const productName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #fffbeb, #ffffff)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ background: 'black', color: 'white', padding: '10px 20px', borderRadius: '8px', fontSize: 32, fontWeight: 'bold', marginRight: '20px' }}>
            MANEVIA
          </div>
          <div style={{ fontSize: 32, color: '#d97706', fontWeight: 'bold' }}>
            Luxury Human Hair
          </div>
        </div>
        
        <h1 style={{ fontSize: 64, fontWeight: 'black', color: '#111827', lineHeight: 1.1, marginBottom: '20px', maxWidth: '800px' }}>
          {productName}
        </h1>
        
        <div style={{ fontSize: 36, color: '#4b5563', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '15px' }}>✨</span> Virtual Try-On Available
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
