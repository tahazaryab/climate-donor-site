import NavBar from "../components/NavBar";
import React from "react";
import styles from "../styles/Home.module.css";

const posts = [
	["May 18, 2021", "When words fail", "We all probably have a visceral reaction when we think about home. So, when I read this Opinion piece, entitled “When words fail”,  in the @stanforddaily, the idea of home sent chills through me when  contemplated in view of #climatechange and #speciesextinction"],
	["April 21, 2021", "Earth Day 2021", "As we approach Earth Day 2021, we must collectively acknowledge that our climate situation is dire but not hopeless. As a native Californian, I have seen wild fires every year in the state. They have been a part of this landscape for as long as people have lived here. But"],
	["December 13, 2020", "QuantumScape", "QuantumScape, Inc., a Stanford spin-off company this past week showcased its groundbreaking solid-state electric vehicle battery.  QuantumScape’s technology is truly game changing and will help in incalculable ways in our fight against climate change"],
	["test date1", "test title1", "test description"],
	["test date2", "test title2", "test description"],
	["test date3", "test title3", "test description"],
	["test date4", "test title4", "test description"],
	["test date5", "test title5", "test description"],
	["test date6", "test title6", "test description"],
	["test date7", "test title7", "test description"],
]


function goToPage(pageNum) {
	let element = document.getElementById("postListContainer");
  element.scrollIntoView({behavior: "smooth"});
}

function Pagination() {
	const [page, setPage] = React.useState(1);

	let nextPage = page + 1;
	let prevPage = page <= 1 ? 1 : page - 1;

	return (
		<>
			<div className={styles.paginationContainer}>
				<button onClick={() => setPage(prevPage)}>{"<"}</button>
				<button>1</button>
				<button>2</button>
				<button>3</button>
				<button>4</button>
				<button onClick={() => setPage(nextPage)}>{">"}</button>
				<p>{prevPage}</p>
				<p>page: {page}</p>
				<p>{nextPage}</p>
			</div>
		</>
	)
}

function PostDescription(props) {
  return (
    <>
      <div className={styles.postInfoContainer}>
        <h5>{props.date}</h5>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
    </>
  )
}

function PostList() {
	let indices = [];
  for (let i = 0; i < posts.length; i++)
    indices.push(i);
  return (
    <>
      <div className={styles.postInfoList} id="postListContainer">
        <div>
          {indices.map(index => 
          <PostDescription
            key={"post" + index.toString()}
            date={posts[index][0]}
            title={posts[index][1]}
            description={posts[index][2]}
          />)}
        </div>
				<Pagination />
      </div>
    </>
  )
}

export default function News() {
  return (
    <>
			<NavBar />
			<div className={styles.newsHeader}>
        <div className={styles.podcastHeaderContainer}>
          <div className={styles.title}>
            <h1 className="global-h1">
              News
            </h1>
            <h2 className="subtitle">
							Read about the latest climate-related news or engage with our blog posts that feature works ranging from opinion pieces to poetry.
            </h2>
          </div>
        </div>
      </div>
			<PostList />
		</>
  );
}