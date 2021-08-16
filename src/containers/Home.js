import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchCompany } from "../reducers/apiReducer";

const Home = () => {
  // getting user search
  const [search, setSearch] = useState("")

  const history = useHistory()
  
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user) history.push("/");
  }, [user]);

  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);

  console.log(company);

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(fetchCompany(search));
    console.log(search)
  }
  
  return (
    <div className="main_wrapper">
      <Navbar logout="Logout" homeNav={true} />
      <div className="root">
        <h2 className="subtitle">Accurate, Fast and Reliable Data</h2>
        <div className="card_wrap">
          <div className="card">
            <form className="form" onSubmit={submitHandler}>
              <input
                className="main-form"
                type="text"
                placeholder="Enter domain name or LinkedIn name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <input type="submit" className="check-btn" value="Check" />
            </form>
          </div>
          <div className="info-card">
            <div className="display-card">
              <h3>Industry: {company?.industry}</h3>
              <h3>Name: {company?.name}</h3>
              <h3>Country: {company?.country}</h3>
              <h3>Year Founded: {company?.year_founded}</h3>
              <h3>Linkedin Url: {company?.linkedin_url}</h3>
              <h3>Domain: {company?.domain}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
