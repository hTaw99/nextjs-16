# Guest Checkout Flow - Implementation Guide

## Overview
The MENA Business Directory uses a **guest checkout** system where users don't need to register or sign in. They only need a verified email address to complete purchases.

## User Flow

### 1. Shopping & Cart
1. User browses companies and adds premium reports to cart
2. Cart icon in header shows item count
3. User clicks cart icon to view cart

### 2. Email Verification (No Registration Required)
1. User clicks "Proceed to Checkout" in cart
2. Email verification modal appears
3. User enters email address
4. System sends 6-digit verification code to email
5. User enters verification code
6. System verifies code
7. Email is confirmed ✓

### 3. Payment Processing
1. User is redirected to secure payment gateway
2. User completes payment
3. Payment confirmation received

### 4. Post-Payment
1. **Electronic invoice generated automatically**
2. **Invoice sent to verified email**
3. Order confirmation sent to email
4. Documents delivered via email within TAT

## Technical Implementation

### Frontend Components

#### 1. Email Verification Modal
**File:** `components/email-verification-modal.tsx`

**Features:**
- Two-step process: Email input → Code verification
- Real-time validation
- Resend code functionality
- Loading states
- Error handling
- Responsive design

**Props:**
```typescript
interface EmailVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onVerified: (email: string) => void
  totalAmount: number
}
```

#### 2. Cart Page Integration
**File:** `app/cart/page.tsx`

**Features:**
- Triggers email verification on checkout
- Passes verified email to payment gateway
- Displays guest checkout information
- No sign-in/register buttons

### Backend API Endpoints (To Be Implemented)

#### 1. Send Verification Code
```typescript
POST /api/auth/send-verification-code

Request:
{
  "email": "user@example.com"
}

Response:
{
  "success": true,
  "message": "Verification code sent",
  "expiresIn": 300 // seconds
}
```

**Implementation Requirements:**
- Generate 6-digit random code
- Store code with expiration (5 minutes)
- Send email with code
- Rate limiting (max 3 attempts per email per 10 minutes)

#### 2. Verify Code
```typescript
POST /api/auth/verify-code

Request:
{
  "email": "user@example.com",
  "code": "123456"
}

Response:
{
  "success": true,
  "token": "verification_token_xyz",
  "email": "user@example.com"
}
```

**Implementation Requirements:**
- Check code validity
- Check expiration
- Return verification token
- Invalidate code after successful verification

#### 3. Create Order
```typescript
POST /api/orders/create

Headers:
{
  "X-Verification-Token": "verification_token_xyz"
}

Request:
{
  "email": "user@example.com",
  "items": [
    {
      "companyId": "1",
      "companyName": "Emirates Steel",
      "itemId": "business_activities",
      "itemName": "Business Activities",
      "price": 25.00,
      "language": "english"
    }
  ],
  "subtotal": 25.00,
  "tax": 1.25,
  "total": 26.25
}

Response:
{
  "orderId": "ORD-2025-001",
  "paymentUrl": "https://payment-gateway.com/checkout/...",
  "email": "user@example.com"
}
```

#### 4. Generate Invoice (Post-Payment)
```typescript
POST /api/invoices/generate

Request:
{
  "orderId": "ORD-2025-001",
  "paymentId": "PAY-XYZ-123",
  "email": "user@example.com"
}

Response:
{
  "invoiceId": "INV-2025-001",
  "invoiceNumber": "MENA-2025-001",
  "pdfUrl": "https://cdn.example.com/invoices/INV-2025-001.pdf",
  "emailSent": true
}
```

**Implementation Requirements:**
- Generate PDF invoice with:
  - Company logo and details
  - Invoice number and date
  - Customer email
  - Itemized list of purchased reports
  - Subtotal, tax, total
  - Payment method and transaction ID
  - Terms and conditions
- Send invoice via email
- Store invoice in database
- Provide download link

### Email Templates

#### 1. Verification Code Email
**Subject:** Your Verification Code - MENA Business Directory

```
Hello,

Your verification code is: 123456

This code will expire in 5 minutes.

If you didn't request this code, please ignore this email.

Best regards,
MENA Business Directory Team
```

#### 2. Order Confirmation Email
**Subject:** Order Confirmation #ORD-2025-001

```
Thank you for your order!

Order Details:
- Order Number: ORD-2025-001
- Date: Dec 26, 2025
- Total: $26.25 USD

Items Purchased:
1. Emirates Steel Industries - Business Activities ($25.00)
   Tax: $1.25

Your electronic invoice is attached.

Your documents will be delivered within the specified turnaround time.

Need help? Contact us at support@menabusiness.com

Best regards,
MENA Business Directory Team
```

#### 3. Invoice Email
**Subject:** Invoice #MENA-2025-001 - Payment Received

```
Payment Received - Thank You!

Please find your electronic invoice attached.

Invoice Number: MENA-2025-001
Payment Date: Dec 26, 2025
Amount Paid: $26.25 USD

Transaction ID: PAY-XYZ-123

Documents will be delivered to this email address within:
- Business Activities: 2-3 business days

For questions about your order, please reference your invoice number.

Best regards,
MENA Business Directory Team
```

### Payment Gateway Integration

#### Recommended Options for MENA Region:
1. **Stripe** - International, widely supported
2. **PayPal** - Global payment processor
3. **2Checkout** - MENA-friendly
4. **Telr** - Middle East specific
5. **PayTabs** - MENA region specialist

#### Integration Flow:
1. User completes email verification
2. Create order in database
3. Redirect to payment gateway with order details
4. Payment gateway processes payment
5. Webhook receives payment confirmation
6. Generate and send invoice
7. Update order status
8. Queue document delivery

### Security Considerations

1. **Email Verification:**
   - Rate limiting on code sending
   - Code expiration (5 minutes)
   - Maximum verification attempts (3 per code)
   - Secure random code generation

2. **Payment:**
   - HTTPS only
   - PCI DSS compliant payment gateway
   - No card details stored locally
   - Transaction encryption

3. **Invoice Generation:**
   - Unique invoice numbers
   - PDF encryption option
   - Secure file storage
   - Access logging

### Database Schema

#### Verification Codes Table
```sql
CREATE TABLE verification_codes (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  code VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  attempts INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_email_code ON verification_codes(email, code);
CREATE INDEX idx_expires_at ON verification_codes(expires_at);
```

#### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  items JSONB NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_id VARCHAR(255),
  payment_status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_email ON orders(email);
CREATE INDEX idx_order_number ON orders(order_number);
CREATE INDEX idx_payment_id ON orders(payment_id);
```

#### Invoices Table
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  order_id UUID REFERENCES orders(id),
  email VARCHAR(255) NOT NULL,
  pdf_url TEXT,
  total DECIMAL(10,2) NOT NULL,
  issued_at TIMESTAMP DEFAULT NOW(),
  email_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_order_id ON invoices(order_id);
CREATE INDEX idx_invoice_number ON invoices(invoice_number);
```

## Testing Checklist

### Frontend Testing
- [ ] Email validation works correctly
- [ ] Verification code sends successfully
- [ ] Code input only accepts numbers
- [ ] Resend code functionality works
- [ ] Modal closes properly
- [ ] Loading states display correctly
- [ ] Error messages are clear
- [ ] Mobile responsive

### Backend Testing
- [ ] Code generation is random and secure
- [ ] Codes expire after 5 minutes
- [ ] Rate limiting prevents spam
- [ ] Email delivery is reliable
- [ ] Payment gateway integration works
- [ ] Invoice generates correctly
- [ ] PDF format is professional
- [ ] Email delivery confirms
- [ ] Order status updates properly

### End-to-End Testing
- [ ] Complete purchase flow works
- [ ] Invoice received via email
- [ ] Invoice contains correct information
- [ ] Documents delivery process triggers
- [ ] Order confirmation sent
- [ ] Cart clears after successful purchase

## Demo Mode (Current Implementation)

For demonstration purposes, the current implementation:
- Accepts any valid email format
- Uses hardcoded verification code: `123456`
- Shows alert dialogs for payment flow
- Simulates delays with setTimeout

**To activate production mode:**
1. Implement backend API endpoints
2. Update `handleSendCode` in `email-verification-modal.tsx`
3. Update `handleVerifyCode` in `email-verification-modal.tsx`
4. Implement payment gateway redirect
5. Set up webhook handlers
6. Configure email service (SendGrid, AWS SES, etc.)
7. Implement invoice PDF generation

## Environment Variables

```env
# Email Service
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@menabusiness.com
SMTP_PASSWORD=your_password
FROM_EMAIL=noreply@menabusiness.com

# Payment Gateway
PAYMENT_GATEWAY_API_KEY=your_api_key
PAYMENT_GATEWAY_SECRET=your_secret
PAYMENT_GATEWAY_WEBHOOK_SECRET=your_webhook_secret

# Invoice Storage
AWS_S3_BUCKET=mena-invoices
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=me-south-1

# Application
APP_URL=https://menabusiness.com
API_URL=https://api.menabusiness.com
```

## Support & Maintenance

### Monitoring
- Email delivery success rate
- Verification code success rate
- Payment completion rate
- Invoice generation success rate
- Average checkout time

### Common Issues
1. **Emails not received:** Check spam folder, verify SMTP settings
2. **Invalid verification code:** Check expiration, verify code generation
3. **Payment fails:** Check payment gateway logs, verify API keys
4. **Invoice not generated:** Check PDF generation service, verify templates

---

**Last Updated:** December 26, 2025
**Version:** 1.0
**Status:** Ready for Backend Integration

