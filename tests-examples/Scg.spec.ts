import { test, expect } from '@playwright/test';
import { createHash } from 'crypto';
import * as fs from 'fs';

test('Verify that the SVG image in the Create Company tab matches the uploaded image', async ({ page }) => {
  // Define file paths and company ID
  const imagePath = './path-to-your-uploaded-image.svg';
  const companyId = '12345'; // Replace with actual company ID
  
  // Helper function to generate hash from image data
  function generateImageHash(imageBuffer: Buffer): string {
    return createHash('sha256').update(imageBuffer).digest('hex');
  }

  // Step 1: Upload the image using an API call
  const [response] = await Promise.all([
    page.waitForResponse(response => response.url().includes('/api/uploadImage') && response.status() === 200),
    page.setInputFiles('input[type="file"]', imagePath) // Upload the image file through UI or API
  ]);
  expect(response.ok()).toBeTruthy();

  // Step 2: Capture the uploaded image data (optional: depends on how API returns the upload response)
  const uploadedImageBuffer = await fs.promises.readFile(imagePath);
  const uploadedImageHash = generateImageHash(uploadedImageBuffer);

  // Step 3: Navigate to the 'Create Company' tab and retrieve the displayed SVG image
  await page.goto(`/admin/company/${companyId}`); // Go to the relevant company page
  const svgImageElement = await page.$('img[src$=".svg"]'); // Select the displayed SVG image element
  const svgImageUrl = await svgImageElement?.getAttribute('src');

  // Step 4: Fetch the SVG image data using the URL
  const svgImageResponse = await page.request.get(svgImageUrl!);
  expect(svgImageResponse.ok()).toBeTruthy();

  const svgImageBuffer = Buffer.from(await svgImageResponse.body());

  // Step 5: Compare the uploaded image and the displayed image using their hash values
  const displayedImageHash = generateImageHash(svgImageBuffer);
  expect(displayedImageHash).toBe(uploadedImageHash);

  console.log('SVG image matches the uploaded image!');
});
