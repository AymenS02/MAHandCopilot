import { v2 as cloudinary } from 'cloudinary';

const cleanEnvValue = (value) => {
  if (!value) return value;
  return value.trim().replace(/^['"]|['"]$/g, '');
};

const getCloudinaryConfig = () => {
  const cloudName = cleanEnvValue(process.env.CLOUDINARY_CLOUD_NAME);
  const apiKey = cleanEnvValue(process.env.CLOUDINARY_API_KEY);
  const apiSecret = cleanEnvValue(process.env.CLOUDINARY_API_SECRET);
  const cloudinaryUrl = cleanEnvValue(process.env.CLOUDINARY_URL);

  if (cloudName && apiKey && apiSecret) {
    return { cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret };
  }

  if (cloudinaryUrl) {
    try {
      const parsed = new URL(cloudinaryUrl);
      return {
        cloud_name: parsed.hostname,
        api_key: decodeURIComponent(parsed.username),
        api_secret: decodeURIComponent(parsed.password),
      };
    } catch (error) {
      console.error('Invalid CLOUDINARY_URL format:', error);
    }
  }

  return null;
};

export async function POST(req) {
  try {
    const config = getCloudinaryConfig();
    if (!config?.cloud_name || !config?.api_key || !config?.api_secret) {
      return new Response(JSON.stringify({ error: 'Cloudinary credentials are not configured' }), {
        status: 500,
      });
    }

    cloudinary.config(config);

    const data = await req.formData();
    const file = data.get('file');

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadedResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'events' }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    return new Response(JSON.stringify({ url: uploadedResponse.secure_url }), { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Image upload failed' }), { status: 500 });
  }
}
