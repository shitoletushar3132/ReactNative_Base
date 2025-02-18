const calculateDiscount = ({
  couponDiscount,
  couponDiscountType,
  totalPrice,
}) => {
  if (couponDiscount > 0) {
    if (couponDiscountType == 'Percentage') {
      const totalCouponDiscount = couponDiscount * (totalPrice / 100);
      const discount = totalPrice - totalCouponDiscount;
      return totalCouponDiscount;
    } else {
      if (totalPrice > couponDiscount) {
        const discount = totalPrice - couponDiscount;
        return couponDiscount;
      }
    }
  }
};

const charge = (allChargeArry, totalPrice) => {
  // allChargeArry.map((charge,index)=>())
};

export {calculateDiscount};
