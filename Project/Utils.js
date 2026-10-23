export const finalPrice = (p) => p.price * (1 - p.discount / 100);
export const formatPrice = (p) => Math.round(p).toLocaleString("vi-VN") + "đ";