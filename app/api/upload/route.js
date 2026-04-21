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
    return {
      config: { cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret },
      error: null,
    };
  }

  if (cloudinaryUrl) {
    try {
      const parsed = new URL(cloudinaryUrl);
      const parsedCloudName = cleanEnvValue(parsed.hostname);
      const parsedApiKey = cleanEnvValue(decodeURIComponent(parsed.username));
      const parsedApiSecret = cleanEnvValue(decodeURIComponent(parsed.password));

      if (!parsedCloudName || !parsedApiKey || !parsedApiSecret) {
        return {
          config: null,
          error:
            'Invalid CLOUDINARY_URL credentials. Ensure API key, API secret, and cloud name are all present',
        };
      }

      return {
        config: {
          cloud_name: parsedCloudName,
          api_key: parsedApiKey,
          api_secret: parsedApiSecret,
        },
        error: null,
      };
    } catch (error) {
      console.error('Invalid CLOUDINARY_URL format:', error);
        return {
          config: null,
          error: 'Invalid CLOUDINARY_URL format. Use cloudinary://<API_KEY>:<API_SECRET>@<cloud_name>',
        };
      }
  }

  return {
    config: null,
    error:
      'Cloudinary credentials are not configured. Set CLOUDINARY_CLOUD_NAME/CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET or CLOUDINARY_URL',
  };
};

const cloudinarySetup = getCloudinaryConfig();
if (cloudinarySetup.config) {
  cloudinary.config(cloudinarySetup.config);
}

export async function POST(req) {
  try {
    if (!cloudinarySetup.config) {
      return new Response(JSON.stringify({ error: cloudinarySetup.error }), { status: 503 });
    }

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
