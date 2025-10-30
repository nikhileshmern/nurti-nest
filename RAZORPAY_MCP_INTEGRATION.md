# Razorpay MCP Integration Guide

This guide explains how to integrate Razorpay MCP tools into your payment flow for the Nutri Nest application.

## Overview

The Razorpay MCP (Model Context Protocol) tools provide a comprehensive set of functions to handle payments, orders, refunds, and other Razorpay operations. This integration replaces the traditional Razorpay SDK approach with a more flexible MCP-based system.

## Available MCP Tools

### Order Management
- `mcp_rzp-mcp-server_create_order` - Create new orders
- `mcp_rzp-mcp-server_fetch_order` - Fetch order details
- `mcp_rzp-mcp-server_fetch_all_orders` - Fetch multiple orders
- `mcp_rzp-mcp-server_update_order` - Update order notes

### Payment Processing
- `mcp_rzp-mcp-server_initiate_payment` - Initiate payments
- `mcp_rzp-mcp-server_capture_payment` - Capture authorized payments
- `mcp_rzp-mcp-server_fetch_payment` - Fetch payment details
- `mcp_rzp-mcp-server_fetch_all_payments` - Fetch multiple payments

### Payment Links
- `mcp_rzp-mcp-server_create_payment_link` - Create standard payment links
- `mcp_rzp-mcp-server_payment_link_upi_create` - Create UPI payment links
- `mcp_rzp-mcp-server_fetch_payment_link` - Fetch payment link details
- `mcp_rzp-mcp-server_update_payment_link` - Update payment links

### QR Codes
- `mcp_rzp-mcp-server_create_qr_code` - Create QR codes for UPI payments
- `mcp_rzp-mcp-server_fetch_qr_code` - Fetch QR code details
- `mcp_rzp-mcp-server_fetch_all_qr_codes` - Fetch multiple QR codes

### Refunds
- `mcp_rzp-mcp-server_fetch_refund` - Fetch refund details
- `mcp_rzp-mcp-server_fetch_all_refunds` - Fetch multiple refunds
- `mcp_rzp-mcp-server_fetch_multiple_refunds_for_payment` - Fetch refunds for a payment

### Settlements
- `mcp_rzp-mcp-server_fetch_settlement_with_id` - Fetch settlement details
- `mcp_rzp-mcp-server_fetch_all_settlements` - Fetch multiple settlements
- `mcp_rzp-mcp-server_fetch_settlement_recon_details` - Fetch reconciliation details

### Customer Management
- `mcp_rzp-mcp-server_fetch_tokens` - Fetch saved payment methods
- `mcp_rzp-mcp-server_revoke_token` - Revoke saved payment methods

## Implementation Examples

### 1. Creating an Order

```typescript
// Using MCP tool to create order
const orderData = {
  amount: 10000, // ₹100 in paisa
  currency: 'INR',
  receipt: 'order_123',
  notes: {
    customer_name: 'John Doe',
    customer_email: 'john@example.com'
  }
}

// Call MCP tool
const order = await mcp_rzp_mcp_server_create_order(orderData)
```

### 2. Initiating Payment

```typescript
// Using MCP tool to initiate payment
const paymentData = {
  amount: 10000,
  order_id: 'order_123',
  currency: 'INR',
  customer_id: 'cust_123',
  email: 'john@example.com',
  contact: '9876543210'
}

// Call MCP tool
const payment = await mcp_rzp_mcp_server_initiate_payment(paymentData)
```

### 3. Capturing Payment

```typescript
// Using MCP tool to capture payment
const captureData = {
  payment_id: 'pay_123',
  amount: 10000,
  currency: 'INR'
}

// Call MCP tool
const capture = await mcp_rzp_mcp_server_capture_payment(captureData)
```

### 4. Creating Payment Links

```typescript
// Using MCP tool to create payment link
const linkData = {
  amount: 10000,
  currency: 'INR',
  description: 'YumBurst Gummies Order',
  customer_name: 'John Doe',
  customer_email: 'john@example.com',
  customer_contact: '9876543210'
}

// Call MCP tool
const paymentLink = await mcp_rzp_mcp_server_create_payment_link(linkData)
```

### 5. Creating QR Codes

```typescript
// Using MCP tool to create QR code
const qrData = {
  type: 'upi_qr',
  usage: 'multiple_use',
  name: 'Store Front Display',
  fixed_amount: true,
  payment_amount: 10000
}

// Call MCP tool
const qrCode = await mcp_rzp_mcp_server_create_qr_code(qrData)
```

## API Endpoints

### Create Order
- **Endpoint**: `/api/razorpay/create-order`
- **Method**: POST
- **Description**: Creates a new Razorpay order using MCP tools

### Initiate Payment
- **Endpoint**: `/api/razorpay/initiate-payment`
- **Method**: POST
- **Description**: Initiates payment using MCP tools

### Capture Payment
- **Endpoint**: `/api/razorpay/capture-payment`
- **Method**: POST
- **Description**: Captures authorized payment using MCP tools

### Webhook Handler
- **Endpoint**: `/api/razorpay/webhook`
- **Method**: POST
- **Description**: Handles Razorpay webhooks and can use MCP tools for additional operations

## Payment Flow

1. **Order Creation**: Create order using `create_order` MCP tool
2. **Payment Initiation**: Initiate payment using `initiate_payment` MCP tool
3. **Payment Capture**: Capture authorized payment using `capture_payment` MCP tool
4. **Webhook Processing**: Handle webhooks and use MCP tools for additional operations
5. **Order Completion**: Update order status and create shipment

## Testing

The application includes a comprehensive test flow at `/payment-flow` that demonstrates:

- Step-by-step payment processing
- MCP tool integration
- Error handling
- Success/failure states
- Real-time status updates

## Configuration

### Environment Variables

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Test Mode
NEXT_PUBLIC_TEST_MODE=true
```

### MCP Configuration

The MCP tools are configured in your MCP client configuration file (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "razorpay": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-razorpay"],
      "env": {
        "RAZORPAY_KEY_ID": "your_key_id",
        "RAZORPAY_KEY_SECRET": "your_key_secret"
      }
    }
  }
}
```

## Error Handling

All MCP tool calls should include proper error handling:

```typescript
try {
  const result = await mcp_rzp_mcp_server_create_order(orderData)
  console.log('Order created:', result)
} catch (error) {
  console.error('Order creation failed:', error)
  // Handle error appropriately
}
```

## Best Practices

1. **Always validate input data** before calling MCP tools
2. **Handle errors gracefully** with proper user feedback
3. **Use appropriate timeouts** for MCP tool calls
4. **Log all MCP tool interactions** for debugging
5. **Test thoroughly** in both test and production modes
6. **Implement retry logic** for failed MCP tool calls
7. **Use webhooks** for payment status updates
8. **Store transaction IDs** for reference and reconciliation

## Security Considerations

1. **Never expose API keys** in client-side code
2. **Validate webhook signatures** before processing
3. **Use HTTPS** for all API communications
4. **Implement rate limiting** for API endpoints
5. **Log security events** for monitoring
6. **Use environment variables** for sensitive configuration

## Monitoring and Analytics

- Monitor MCP tool call success rates
- Track payment completion rates
- Log all payment-related events
- Set up alerts for failed payments
- Monitor webhook processing times

## Support

For issues with MCP tool integration:

1. Check MCP server logs
2. Verify API key configuration
3. Test with Razorpay test mode
4. Review webhook endpoint logs
5. Check network connectivity

## Future Enhancements

- Implement recurring payments using mandate orders
- Add support for international payments
- Integrate with additional payment methods
- Add advanced analytics and reporting
- Implement payment retry mechanisms
