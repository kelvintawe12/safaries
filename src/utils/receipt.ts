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
    pad(now.getSeconds())
  ].join('');

  const day = now.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  return `${phoneNumber}-${timestamp}-${day}`;
};

const addCompanyLogo = (doc: jsPDF, currentY: number) => {
  try {
    // Replace with actual base64 logo string or import
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
    doc.text('QR Code Error', x + size/2, y + size/2, { align: 'center' });
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
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
  try {
    const doc = new jsPDF();
    let currentY = MARGIN;

    // Set document metadata
    doc.setProperties({
      title: `Receipt ${receipt.uniqueId}`,
      subject: 'Tour Booking Receipt',
      author: 'Kivu Safaris',
      creator: 'Kivu Safaris',
    });

    // Add logo and header
    currentY = addCompanyLogo(doc, currentY);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Kivu Safaris', PAGE_WIDTH/2, currentY, { align: 'center' });
    currentY += LINE_HEIGHT + SECTION_SPACING;

    // Add receipt information (two columns)
    const leftCol = MARGIN;
    const rightCol = PAGE_WIDTH - MARGIN - 70;
    
    doc.setFontSize(12);
    doc.text(`Receipt ID: ${receipt.uniqueId}`, leftCol, currentY);
    doc.text(`Booking ID: ${receipt.bookingId}`, leftCol, currentY + LINE_HEIGHT);
    
    doc.text(`Created: ${formatDate(new Date(receipt.createdAt))}`, rightCol, currentY);
    doc.text(`Updated: ${formatDate(new Date(receipt.updatedAt))}`, rightCol, currentY + LINE_HEIGHT);
    
    currentY += 2 * LINE_HEIGHT + SECTION_SPACING;
    currentY = addHorizontalLine(doc, currentY);

    // Add client details
    currentY = addSectionHeader(doc, 'Client Details:', MARGIN, currentY);
    
    doc.setFontSize(12);
    const clientDetails = [
      `Name: ${receipt.clientDetails.name}`,
      `Email: ${receipt.clientDetails.email}`,
      `Phone: ${receipt.clientDetails.phone}`,
      ...(receipt.clientDetails.nationality 
        ? [`Nationality: ${receipt.clientDetails.nationality}`] 
        : [])
    ];

    clientDetails.forEach((detail, index) => {
      doc.text(detail, MARGIN + 10, currentY + (index * LINE_HEIGHT));
    });
    
    currentY += clientDetails.length * LINE_HEIGHT + SECTION_SPACING;
    currentY = addHorizontalLine(doc, currentY);

    // Add tour details
    currentY = addSectionHeader(doc, 'Tour Details:', MARGIN, currentY);
    
    const tourDetails = [
      `Title: ${receipt.tourDetails.title.en}`,
      `Date: ${formatDate(new Date(receipt.tourDetails.date))}`,
      `Participants: ${receipt.tourDetails.participants}`,
      `Price: ${formatCurrency(receipt.tourDetails.price, receipt.paymentDetails.currency)}`
    ];

    tourDetails.forEach((detail, index) => {
      doc.text(detail, MARGIN + 10, currentY + (index * LINE_HEIGHT));
    });
    
    currentY += tourDetails.length * LINE_HEIGHT + SECTION_SPACING;
    currentY = addHorizontalLine(doc, currentY);

    // Add payment details
    currentY = addSectionHeader(doc, 'Payment Details:', MARGIN, currentY);

    const paymentDetails = [
      `Total: ${formatCurrency(receipt.paymentDetails.total, receipt.paymentDetails.currency)}`,
      `Deposit: ${formatCurrency(receipt.paymentDetails.deposit, receipt.paymentDetails.currency)}`,
      `Balance: ${formatCurrency(receipt.paymentDetails.balance, receipt.paymentDetails.currency)}`,
      `Method: ${receipt.paymentDetails.method.replace('_', ' ')}`,
      `Transaction ID: ${receipt.paymentDetails.transactionId}`,
      `Paid At: ${formatDate(new Date(receipt.paymentDetails.paidAt))}`
    ];

    paymentDetails.forEach((detail, index) => {
      doc.text(detail, MARGIN + 10, currentY + (index * LINE_HEIGHT));
    });

    currentY += paymentDetails.length * LINE_HEIGHT + SECTION_SPACING;

    // Add optional fields
    if (receipt.promocode) {
      doc.text(`Promocode Applied: ${receipt.promocode}`, MARGIN, currentY);
      currentY += LINE_HEIGHT;
    }

    if (receipt.taxDetails) {
      const taxText = `Tax (${(receipt.taxDetails.rate * 100).toFixed(2)}% - ${
        receipt.taxDetails.description
      }): ${formatCurrency(receipt.taxDetails.amount, receipt.paymentDetails.currency)}`;
      
      doc.text(taxText, MARGIN, currentY);
      currentY += LINE_HEIGHT;
    }

    // Add QR code
    if (receipt.paymentDetails.transactionId) {
      const qrSize = 40;
      const qrX = PAGE_WIDTH - MARGIN - qrSize;
      const qrY = currentY;
      await addQRCode(doc, receipt.paymentDetails.transactionId, qrX, qrY, qrSize);
    }

    // Add footer
    currentY = Math.max(currentY, doc.internal.pageSize.height - 20);
    doc.setFontSize(12);
    doc.text('Thank you for choosing Kivu Safaris!', PAGE_WIDTH/2, currentY, { align: 'center' });

    return doc.output('blob');
  } catch (error) {
    console.error('Error generating receipt PDF:', error);
    throw new Error('Failed to generate receipt');
  }
};

export const saveReceiptPDF = async (receipt: Receipt) => {
  try {
    const blob = await generateReceipt(receipt);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Kivu_Receipt_${receipt.uniqueId}.pdf`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Error saving receipt PDF:', error);
    throw new Error('Failed to save receipt');
  }
};