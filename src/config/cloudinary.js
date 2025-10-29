import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración de Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME_CLOUDINARY, 
    api_key: process.env.API_KEY_CLOUDINARY, 
    api_secret: process.env.API_SECRET_CLOUDINARY
});

/**
 * Sube una imagen a Cloudinary
 * @param {Buffer} fileBuffer - Buffer del archivo
 * @param {string} folder - Carpeta en Cloudinary (ej: 'productos')
 * @returns {Promise<Object>} - Resultado de la subida con url y public_id
 */
export const subirImagen = async (fileBuffer, folder = 'productos') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'image',
        transformation: [
          { width: 1000, height: 1000, crop: 'limit' }, // Limitar tamaño máximo
          { quality: 'auto' }, // Optimizar calidad automáticamente
          { fetch_format: 'auto' } // Formato automático (WebP cuando sea posible)
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id
          });
        }
      }
    );

    // Convertir buffer a stream y subir
    uploadStream.end(fileBuffer);
  });
};

/**
 * Elimina una imagen de Cloudinary
 * @param {string} publicId - Public ID de la imagen en Cloudinary
 * @returns {Promise<Object>} - Resultado de la eliminación
 */
export const eliminarImagen = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Extrae el public_id de una URL de Cloudinary
 * @param {string} url - URL completa de Cloudinary
 * @returns {string} - Public ID extraído
 */
export const extraerPublicId = (url) => {
  if (!url) return null;
  
  // Extraer el public_id de la URL de Cloudinary
  // Formato típico: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{format}
  const matches = url.match(/\/v\d+\/(.+)\.\w+$/);
  if (matches && matches[1]) {
    return matches[1];
  }
  
  // Si no coincide, intentar extraer desde /upload/
  const altMatches = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
  if (altMatches && altMatches[1]) {
    return altMatches[1];
  }
  
  return null;
};

export default cloudinary;