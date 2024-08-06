import React from 'react';
import { Buffer } from 'buffer';

export default async function Page({ searchParams }) {
  const secretKey = process.env.TOSS_CLIENT_SECRET || "";
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  const payments = await fetch(
    `https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`,
    {
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/json"
      },
    }
  ).then(res => res.json());

  const { card } = payments;

  return (
    <div>
      <h1>Payment completed</h1>
      <ul>
        <li>Item name: {payments.orderName}</li>
        <li>Order num: {payments.orderId}</li>
        <li>Card company: {card.company}</li>
        <li>Card num: {card.number}</li>
        <li>Payment amount: {card.amount}</li>
        <li>Payment day: {new Intl.DateTimeFormat().format(new Date(payments.approvedAt))}</li>
      </ul>
    </div>
  );
}
