import { jsPDF } from 'jspdf';
import { Receipt } from '../types';
export const generateUniqueId = (phoneNumber: string): string => {
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 12);
  const day = new Date().toLocaleString('en-US', {
    weekday: 'short'
  });
  return `${phoneNumber}-${timestamp}-${day}`;
};
export const generateReceipt = async (receipt: Receipt): Promise<Blob> => {
  const doc = new jsPDF();
  // Add company logo
  // doc.addImage('logo.png', 'PNG', 15, 15, 30, 30)
  // Add header
  doc.setFontSize(20);
  doc.text('Kivu Safaris', 105, 20, {
    align: 'center'
  });
  // Add receipt details
  doc.setFontSize(12);
  doc.text(`Receipt ID: ${receipt.uniqueId}`, 20, 40);
  doc.text(`Date: ${new Date(receipt.createdAt).toLocaleDateString()}`, 20, 50);
  // Add client details
  doc.text('Client Details:', 20, 70);
  doc.text(`Name: ${receipt.clientDetails.name}`, 30, 80);
  doc.text(`Email: ${receipt.clientDetails.email}`, 30, 90);
  doc.text(`Phone: ${receipt.clientDetails.phone}`, 30, 100);
  // Add tour details
  doc.text('Tour Details:', 20, 120);
  doc.text(`Tour: ${receipt.tourDetails.title}`, 30, 130);
  doc.text(`Date: ${receipt.tourDetails.date}`, 30, 140);
  doc.text(`Participants: ${receipt.tourDetails.participants}`, 30, 150);
  doc.text(`Total Price: $${receipt.tourDetails.price}`, 30, 160);
  // Add footer
  doc.text('Thank you for choosing Kivu Safaris!', 105, 200, {
    align: 'center'
  });
  return doc.output('blob');
};