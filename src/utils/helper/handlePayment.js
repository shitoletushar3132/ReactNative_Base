import RazorpayCheckout from 'react-native-razorpay';

const handlePayment = async () => {
  try {
    // This is the payment options object
    const options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_t6AcVBAshgb', // Replace with your actual Razorpay key
      amount: '500000', // Amount in paise (5000 INR = 500000 paise)
      name: 'Acme Corp',
      order_id: '1234', // Replace with a real order_id from Razorpay API
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar',
      },
      theme: {color: '#53a20e'},
    };

    // Open the Razorpay Checkout
    RazorpayCheckout.open(options)
      .then(data => {
        // Handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // Handle failure
        console.log(error);

        alert(`Error: ${error.code} | ${error.description}`);
      });
  } catch (error) {
    console.log(error);
  }
};

export {handlePayment};
