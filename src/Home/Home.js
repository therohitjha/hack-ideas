import { useState, useEffect, useRef } from "react";
import Tile from "../Tile/Tile";
import Sorting from "../Sort/Sorting";
import Header from "../Header/Header";
import Search from "../Search/Search";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const searchRef = useRef();
  const sortRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [disableSort, setDisableSort] = useState(true);
  const errorMsg = "Something wrong, please come back later...";

  const logout = () => {
    sessionStorage.removeItem("hackUser");
    window.location.href = "/login";
  };

  const handleUpvoteClick = async (e, id) => {
    e.preventDefault();
    const data = challenges.filter((challenge) => challenge.id === id)[0];
    if (!challenges.some((e) => e.likesId.some((k) => k === id))) {
      data.likes = data?.likes + 1;
      data.likesId.push(...data?.likesId, id);
      await fetch(`http://localhost:8000/challenges/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      getChallenges();
    }
  };
  const handleDownVoteClick = async (e, id) => {
    e.preventDefault();
    const data = challenges.filter((challenge) => challenge.id === id)[0];
    if (!challenges.some((e) => e.dislikesId.some((k) => k === id))) {
      data.dislikes = data?.dislikes + 1;
      data.dislikesId.push(...data?.dislikesId, id);
      await fetch(`http://localhost:8000/challenges/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      getChallenges();
    }
  };

  const createChallenge = async (data) => {
    const postData = {
      ...data,
      author: location?.state?.user?.name,
      likes: 0,
      dislikes: 0,
      dislikesId: [],
      likesId: [],
      empId: location?.state?.user?.id,
      createdOn: Date.now(),
    };

    await fetch("http://localhost:8000/challenges", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: { "Content-Type": "application/json" },
    });

    getChallenges();
  };

  const getChallenges = async (searchTerm = searchRef.current.value()) => {
    setIsLoading(true);
    let uri = "http://localhost:8000/challenges";
    if (searchTerm) uri += `&q=${searchTerm}`;
    try {
      const res = await fetch(uri);
      if (!res.ok) {
        throw Error("error in fetching challenges");
      }
      const data = await res.json();
      setDisableSort(!data.length);
      setChallenges(data || []);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(errorMsg);
    }
  };

  function handleSorting(sort = sortRef.current.value()) {
    let data = [...challenges];
    if (sort.value === "likes") {
      data.sort((a, b) => b.likes - a.likes);
      setChallenges(data);
    } else if (sort.value === "dislikes") {
      data.sort((a, b) => b.dislikes - a.dislikes);
      setChallenges(data);
    } else if(sort.value==='createdOn') {
      data.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
      setChallenges(data);
    }else{
        getChallenges();
    }
  }

  useEffect(() => {
    searchRef.current.clear();
    getChallenges();
  }, []);

  return (
    <div className="homepage">
      <Header
        user={location?.state?.user}
        data={challenges}
        handleCreate={createChallenge}
        handleLogout={logout}
      ></Header>
      <div className="main-container">
        {isLoading && <div className="loader"></div>}
        {error && <div className="error-container">{error}</div>}
        <Search
          ref={searchRef}
          handleSearch={(data) => getChallenges(data.searchTerm)}
        ></Search>
        <Sorting
          ref={sortRef}
          disable={disableSort}
          handleChange={handleSorting}
        ></Sorting>
        {challenges.length && (
          <div className="challenges-container">
            {challenges.map((challenge, index) => (
              <Tile
                key={`tile${index}`}
                data={challenge}
                handleUpvote={handleUpvoteClick}
                handleDownvote={handleDownVoteClick}
              />
            ))}
            {!challenges.length && (
              <div className="no-challenges">
                Oops, no challenges exist, Click 'Create' to add one.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
