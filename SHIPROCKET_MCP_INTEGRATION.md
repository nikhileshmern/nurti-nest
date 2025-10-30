# 📦 Shiprocket MCP Integration Guide

## ✅ Setup Complete!

The Shiprocket MCP server has been installed and configured. Here's what's been done:

### 1. MCP Server Installation
- ✅ Cloned Shiprocket MCP repository to `/Users/nikhilesh/shiprocket-mcp`
- ✅ Installed dependencies
- ✅ Built the server
- ✅ Added to MCP configuration (`~/.cursor/mcp.json`)

### 2. Configuration
```json
{
  "shiprocket-mcp": {
    "command": "npm",
    "args": ["--prefix", "/Users/nikhilesh/shiprocket-mcp", "start", "--silent"],
    "env": {
      "SELLER_EMAIL": "${SHIPROCKET_EMAIL}",
      "SELLER_PASSWORD": "${SHIPROCKET_PASSWORD}"
    }
  }
}
```

---

## 🔐 Next Step: Add Your Shiprocket Credentials

### 1. Sign Up for Shiprocket
Go to [shiprocket.in](https://www.shiprocket.in/) and create an account.

### 2. Update `.env.local`
Replace the demo credentials in `.env.local`:

```bash
# Shiprocket MCP Configuration
SHIPROCKET_EMAIL=your_actual_email@example.com
SHIPROCKET_PASSWORD=your_actual_password
```

### 3. Restart Cursor
After updating credentials:
1. Save `.env.local`
2. Restart Cursor completely
3. The Shiprocket MCP tools will be available

---

## 🛠️ Available Shiprocket MCP Tools

Once configured, you'll have access to these tools:

### Order Management
- `create_order` - Create a new Shiprocket order
- `get_order_details` - Get details of a specific order
- `cancel_order` - Cancel an order
- `update_order` - Update order details

### Shipping
- `create_shipment` - Create a shipment for an order
- `get_shipment_details` - Get shipment tracking details
- `generate_awb` - Generate AWB (Air Waybill) number
- `generate_label` - Generate shipping label
- `generate_manifest` - Generate manifest for pickup

### Pickup
- `schedule_pickup` - Schedule pickup for orders
- `get_pickup_details` - Get pickup details
- `cancel_pickup` - Cancel scheduled pickup

### Tracking
- `track_shipment` - Track shipment by AWB or order ID
- `track_by_awb` - Track using AWB number
- `get_tracking_history` - Get complete tracking history

### Courier
- `get_courier_serviceability` - Check if courier services a pincode
- `get_courier_list` - Get list of available couriers
- `assign_courier` - Assign courier to shipment

### Returns
- `create_return_order` - Create a return order
- `get_return_details` - Get return order details
- `track_return` - Track return shipment

---

## 🚀 Integration Plan

Now that MCP is set up, we'll integrate Shiprocket into your e-commerce flow:

### Phase 1: Shipping Rate Calculation
- Calculate shipping rates on checkout page
- Display shipping options to customer
- Update total with shipping cost

### Phase 2: Order Creation
- After successful payment, create Shiprocket order
- Store Shiprocket order ID in database
- Handle order creation errors

### Phase 3: Shipment Creation
- Generate AWB number
- Create shipping label
- Schedule pickup
- Send tracking details to customer

### Phase 4: Tracking
- Customer tracking page
- Real-time status updates
- Delivery confirmation

### Phase 5: Returns Management
- Customer return request
- Create return order
- Track return shipment
- Process refund

---

## 📝 Implementation Steps

I'll now create the following:

1. **API Routes** for Shiprocket operations
   - `/api/shiprocket/calculate-shipping`
   - `/api/shiprocket/create-order`
   - `/api/shiprocket/track-shipment`
   - `/api/shiprocket/schedule-pickup`

2. **Database Schema Updates**
   - Add `shiprocket_order_id` to orders table
   - Add `awb_number` for tracking
   - Add `shipment_status` field
   - Add `tracking_url` field

3. **UI Components**
   - Shipping rate selector on checkout
   - Order tracking page
   - Tracking status timeline
   - Return request form

4. **Integration with Payment Flow**
   - Auto-create Shiprocket order after payment
   - Auto-schedule pickup
   - Send tracking email

---

## 🎯 Ready to Build!

Everything is set up. Once you add your Shiprocket credentials and restart Cursor, we can start building the integration.

**Next Command:** "Start building Shiprocket integration"


