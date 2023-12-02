const ContactUs = () => {
  let regexEmail = /^[A-Za-z0-9._]+@[A-Za-z]+[.][A-Za-z]+$/;

  const validateEmail = () => {
    let email = document.getElementById("email");
    if (!email.value.match(regexEmail)) {
      alert("Please enter a valid Email");
      email.value = "";
    }
  };

  return (
    <div className="font-poppins bg-gray-100">
      <div className="container mx-auto mt-8">
        <form action="/sendMail" method="post" className="bg-white p-8 rounded shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="mb-8">
              <h1 className="text-4xl font-semibold text-gray-800 mb-2">Contact Us</h1>
              <p className="text-gray-600">As you might expect of a company that began as a high-end interiors contractor, we pay strict attention.</p>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">India</h3>
              <p className="text-gray-600">Indian Institute of Information Technology, Sri City, Chittoor, Andhra Pradesh, 517646</p>
            </div>
            <div>
              <input type="text" name="name" id="name" placeholder="Name" required className="w-full p-2 border border-gray-300 rounded mb-4" />
              <input type="email" name="email" id="email" placeholder="Email" required onChange={validateEmail} className="w-full p-2 border border-gray-300 rounded mb-4" />
              <textarea name="message" id="message" cols="30" rows="7" placeholder="Message" required className="w-full p-2 border border-gray-300 rounded mb-4"></textarea>
              <button type="submit" className="bg-black text-white p-2 rounded font-semibold uppercase tracking-wide">Send Message</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
