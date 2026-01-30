// src/utilis/uploadToCloudinary.ts
export const uploadToCloudinary = async (file: File, preset = "Unicluster"): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dmxa7h4vt/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) throw new Error("Cloudinary upload failed");

  const data = await response.json();
  return data.secure_url; // the URL we save in logoURL
};
