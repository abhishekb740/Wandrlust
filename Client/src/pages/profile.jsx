// import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { extractUserIdFromToken } from '../utils/extractUserIdFromToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

export default function Profile() {
  const [userDetails, setUserDetails] = useState({

  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    const userId = extractUserIdFromToken(token);
    console.log(userId);
    const fetchUserDetails = async () => {
      console.log("fetching user details");
      const res = await fetch(`http://localhost:5000/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) {
        toast(`Error fetching user details`, { type: "error" });
      }
      const data = await res.json();
      setUserDetails(data);
    }
    if (userId) {
      fetchUserDetails();
    }
  }, [])

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <MDBContainer className="py-5 px-11">
        <MDBRow className="justify-center items-center">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-t-lg text-white flex" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 px-3 pt-12 flex-col" style={{ width: '150px' }}>
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image"
                    className="mt-4 mb-5 img-thumbnail"
                    fluid
                    style={{ width: '150px', zIndex: '1' }}
                  />
                  <MDBBtn outline color="text" className="h-9 px-6 ring-2 ring-black text-black">
                    Edit profile
                  </MDBBtn>
                </div>
                <div className="ms-3 text-white flex-grow" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5" className=' text-xl'>{`${userDetails?.name}`}</MDBTypography>
                  <MDBCardText className="mb-1 text-lg">{`${userDetails?.email}`}</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="flex justify-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 text-lg">253</MDBCardText>
                    <MDBCardText className="text-sm text-muted mb-0">Posts</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 text-lg">{`${userDetails.followers?.length}`}</MDBCardText>
                    <MDBCardText className="text-sm text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 text-lg">{`${userDetails.following?.length}`}</MDBCardText>
                    <MDBCardText className="text-sm text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead font-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="italic mb-1">Web Developer</MDBCardText>
                    <MDBCardText className="italic mb-1">Lives in New York</MDBCardText>
                    <MDBCardText className="italic mb-0">Photographer</MDBCardText>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <MDBCardText className="lead font-normal mb-0">Recent photos</MDBCardText>
                  <MDBCardText className="mb-0">
                    <a className="text-muted">
                      Show all
                    </a>
                  </MDBCardText>
                </div>
                <MDBRow className=''>
                  <MDBCol className="mb-2">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                      alt="image 1"
                      className=" w-screen rounded-3"
                    />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="image 1"
                      className="w-full rounded-3"
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="gap-2">
                  <MDBCol className="mb-2">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                      alt="image 1"
                      className="w-full rounded-3"
                    />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                      alt="image 1"
                      className="w-full rounded-3"
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

// import React from 'react'

// const Profile = () => {
//   return (
//     <div>profile</div>
//   )
// }

// export default Profile
