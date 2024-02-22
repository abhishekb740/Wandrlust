const AboutUs = () => {
    return (
        <div className="font-sans bg-gray-100">
            {/* Main Content Section */}
            <div className="feat bg-gray  pb-20">
                <div className="container mx-auto">
                    <div className="row">
                        <div className="section-head col-sm-12">
                            <h4 className="pb-6 pt-4 text-4xl font-bold text-center text-[#eb2168] text-decoration-line: underline">
                                <span>About</span> Us?
                            </h4>
                            <p className="text-center text-gray-700 pb-4 text-lg font-semibold">
                                Our platform provides a centralized hub for travel information
                                and planning, allowing travellers to easily access the resources
                                they need to plan their trip. Our community also enables
                                travellers to connect with others who share their passion for
                                adventure, offering support, friendship, and a sense of
                                belonging. WandrLust makes traveling and exploring new
                                destinations a seamless, enjoyable, and enriching experience.
                            </p>
                        </div>

                        {/* Features Section */}
                        <div className="col-lg-4 col-sm-6">
                            <div className="item bg-white text-center p-8 shadow-lg border border-gray-200 rounded-lg mb-8 transition duration-500 ease-in-out transform hover:bg-[#eb2168] hover:text-white">
                                {/* <span className="icon feature_box_col_one text-yellow-500">
                  <i className="fa fa-globe"></i>
                </span> */}
                                <h6 className="text-2xl font-semibold mb-2">Informative</h6>
                                <p className="hover:text-white">
                                    Allow users to connect with other travellers with similar
                                    interests. Users can share their experiences and connect with
                                    like-minded individuals.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="item bg-white text-center p-8 shadow-lg border border-gray-200 rounded-lg mb-8 transition duration-500 ease-in-out transform hover:bg-[#eb2168] hover:text-white">
                                {/* <span className="icon feature_box_col_one text-yellow-500">
                  <i className="fa fa-globe"></i>
                </span> */}
                                <h6 className="text-2xl font-semibold mb-2">Creative Design</h6>
                                <p className=" hover:text-white">
                                    We are always creative and always listen to our customers and we provide users with tools to make their travel experiences more memorable and organized.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="item bg-white text-center p-8 shadow-lg border border-gray-200 rounded-lg mb-8 transition duration-500 ease-in-out transform hover:bg-[#eb2168] hover:text-white">
                                {/* <span className="icon feature_box_col_one text-yellow-500">
                  <i className="fa fa-globe"></i>
                </span> */}
                                <h6 className="text-2xl font-semibold mb-2">24 x 7 User Support</h6>
                                <p className=" hover:text-white">
                                    If our customer has any problem and any query we are always happy to help them and they can connect with us via Contact Us.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="item bg-white text-center p-8 shadow-lg border border-gray-200 rounded-lg mb-8 transition duration-500 ease-in-out transform hover:bg-[#eb2168] hover:text-white">
                                {/* <span className="icon feature_box_col_one text-yellow-500">
                  <i className="fa fa-globe"></i>
                </span> */}
                                <h6 className="text-2xl font-semibold mb-2">Business Growth</h6>
                                <p className="text-gray-700 hover:text-white">
                                    Planning a trip can be often a challenge, especially for those who are new to it.
                                    Without a reliable platform for travel planning and information, travelers are often left to rely on scattered resources and word-of-mouth recommendations.
                                    This can result in subpar travel experiences, as travelers may not have access to the best resources or information about their destination.
                                    Our platform aims to tackle the exact same problem.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="item bg-white text-center p-8 shadow-lg border border-gray-200 rounded-lg mb-8 transition duration-500 ease-in-out transform hover:bg-[#eb2168] hover:text-white">
                                {/* <span className="icon feature_box_col_one text-yellow-500">
                  <i className="fa fa-globe"></i>
                </span> */}
                                <h6 className="text-2xl font-semibold mb-2">Market Strategy</h6>
                                <p className="text-gray-700 hover:text-white">
                                    The travel industry is a flourishing industry that caters to an individual’s sense of adventure, drive for ambition, and curiosity about culture. Our Website is easy to navigate and has ample of images to make it attractive and readable.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="item bg-white text-center p-8 shadow-lg border border-gray-200 rounded-lg mb-8 transition duration-500 ease-in-out transform hover:bg-[#eb2168] hover:text-white">
                                {/* <span className="icon feature_box_col_one text-yellow-500">
                  <i className="fa fa-globe"></i>
                </span> */}
                                <h6 className="text-2xl font-semibold mb-2">Affordable cost</h6>
                                <p className="text-gray-700 hover:text-white    ">
                                    Our website is completely free to use and offers many different functionalities like adding a post, budget tracking system, location details and other users experiences which can help you to preplan your travel needs and arrange all the facilities before hand.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
