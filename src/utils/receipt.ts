import { jsPDF } from 'jspdf';
import { Receipt } from '../types';
import QRCode from 'qrcode';

// Configuration constants
const PAGE_WIDTH = 210; // A4 width in mm
const MARGIN = 20;
const LINE_HEIGHT = 10;
const SECTION_SPACING = 15;

export const generateUniqueId = (phoneNumber: string): string => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const now = new Date();

  const timestamp = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join('');

  const day = now.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  return `${phoneNumber}-${timestamp}-${day}`;
};

const addCompanyLogo = (doc: jsPDF, currentY: number) => {
  try {
    const logoBase64 = 'data:image/png;base64,...'; // Replace with actual base64 logo string
    doc.addImage(logoBase64, 'PNG', MARGIN, currentY, 30, 30);
    return currentY + 30 + SECTION_SPACING;
  } catch (error) {
    console.error('Failed to add logo:', error);
    doc.setDrawColor(200);
    doc.rect(MARGIN, currentY, 30, 30);
    doc.setFontSize(10);
    doc.text('Company Logo', MARGIN + 15, currentY + 20, { align: 'center' });
    return currentY + 30 + SECTION_SPACING;
  }
};

const addQRCode = async (doc: jsPDF, text: string, x: number, y: number, size: number) => {
  try {
    const dataUrl = await QRCode.toDataURL(text);
    doc.addImage(dataUrl, 'PNG', x, y, size, size);
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    doc.setDrawColor(200);
    doc.rect(x, y, size, size);
    doc.setFontSize(8);
    doc.text('QR Code Error', x + size / 2, y + size / 2, { align: 'center' });
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
};

const formatCurrency = (amount: number, currency: string) => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
};

const addSectionHeader = (doc: jsPDF, text: string, x: number, y: number) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(text, x, y);
  doc.setFont('helvetica', 'normal');
  return y + LINE_HEIGHT;
};

const addHorizontalLine = (doc: jsPDF, y: number) => {
  doc.setDrawColor(200);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  return y + 5;
};

export const generateReceipt = async (receipt: Receipt): Promise<Blob> => {
  const doc = new jsPDF();

  let currentY = MARGIN;

  // Add company logo
  currentY = addCompanyLogo(doc, currentY);

  // Add receipt header
  currentY = addSectionHeader(doc, 'Receipt', MARGIN, currentY);
  currentY = addHorizontalLine(doc, currentY);

  // Add receipt details
  doc.setFontSize(12);
  doc.text(`Receipt ID: ${receipt.id}`, MARGIN, currentY);
  currentY += LINE_HEIGHT;
  doc.text(`Booking ID: ${receipt.bookingId}`, MARGIN, currentY);
  currentY += LINE_HEIGHT;
  doc.text(`Client: ${receipt.clientDetails.name}`, MARGIN, currentY);
  currentY += LINE_HEIGHT;
  doc.text(`Tour: ${receipt.tourDetails.title.en}`, MARGIN, currentY);
  currentY += LINE_HEIGHT;
  doc.text(`Date: ${formatDate(new Date(receipt.tourDetails.date))}`, MARGIN, currentY);
  currentY += LINE_HEIGHT;
  doc.text(`Participants: ${receipt.tourDetails.participants}`, MARGIN, currentY);
  currentY += LINE_HEIGHT;

  // Add payment details
  currentY = addSectionHeader(doc, 'Payment Details', MARGIN, currentY + SECTION_SPACING);
  doc.text(`Total Price: ${formatCurrency(receipt.paymentDetails.total, receipt.paymentDetails.currency)}`, MARGIN, currentY);
  currentY += LINE_HEIGHT;
  doc.text(`Deposit Paid: ${formatCurrency(receipt.paymentDetails.deposit, receipt.paymentDetails.currency)}`, MARGIN, currentY);
  currentY += LINE_HEIGHT;
  doc.text(`Balance: ${formatCurrency(receipt.paymentDetails.balance, receipt.paymentDetails.currency)}`, MARGIN, currentY);
  currentY += LINE_HEIGHT;
  doc.text(`Payment Method: ${receipt.paymentDetails.method}`, MARGIN, currentY);
  currentY += LINE_HEIGHT;

  // Add QR code
  currentY += SECTION_SPACING;
  await addQRCode(doc, receipt.id, PAGE_WIDTH - MARGIN - 30, currentY, 30);

  // Return the PDF as a Blob
  return doc.output('blob');
};

export const saveReceiptPDF = async (receipt: Receipt) => {
  try {
    const blob = await generateReceipt(receipt);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Kivu_Receipt_${receipt.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error saving receipt PDF:', error);
    throw new Error('Failed to save receipt');
  }
};