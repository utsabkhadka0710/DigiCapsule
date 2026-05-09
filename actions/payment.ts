"use server";

import { createHmac } from "crypto";

export const EsewaPayment = async (price: number) => {
  const transactionUuid = `TXN-${Date.now()}`;
  const productCode = process.env.ESEWA_PRODUCT_CODE!;
  const secretKey = process.env.ESEWA_SECRET_KEY!;

  const message = `total_amount=${price},transaction_uuid=${transactionUuid},product_code=${productCode}`;

  const signature = createHmac("sha256", secretKey)
    .update(message)
    .digest("base64");

  return {
    amount: price,
    tax_amount: 0,
    total_amount: price,
    transaction_uuid: transactionUuid,
    product_code: productCode,
    product_service_charge: 0,
    product_delivery_charge: 0,
    success_url: process.env.ESEWA_SUCCESS_URL!,
    failure_url: process.env.ESEWA_FAILURE_URL!,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature,
  };
};
