import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Initialize the client with the correct configuration
export const client = createClient({
    projectId: '65btcib2',
    dataset: 'production',
    apiVersion: '2024-05-28', // use a date string
    useCdn: true, // `false` if you want to ensure fresh data
    token: process.env.SANITY_AUTH_TOKEN,
});

// Function to generate image URLs from Sanity images
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);