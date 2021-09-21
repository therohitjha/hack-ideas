import "./Tile.css";

const Tile = ({
  data: { id, author, title, body, tags, likes, dislikes, createdOn },
  handleUpvote,
  handleDownvote,
}) => {
  createdOn = new Date(createdOn).toDateString();

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="tile-container">
      <div className="header">
        <div className="left-section">
          <h2>{title}</h2>
          <div className="profile">
            <div className="avatar">
              <span className="initials">{getInitials(author)}</span>
            </div>
            <div className="name">{author}</div>
          </div>
        </div>
        <div className="right-section">
          <div className="like-btn" onClick={(e) => handleUpvote(e, id)}>
            likes
          </div>
          <div className="like-cnt">{likes}</div>
        </div>
        <div className="right-section">
          <div className="like-btn" onClick={(e) => handleDownvote(e, id)}>
            Dislikes
          </div>
          <div className="like-cnt">{dislikes}</div>
        </div>
      </div>
      <div className="content">
        <div className="description">{body}</div>
        <div className="tags">
          {tags.map((t, i) => (
            <div key={`tag-${i}`} href="#">
              {t}
            </div>
          ))}
        </div>
      </div>
      <div className="footer">
        <div className="created-date">
          Created on <strong>{createdOn}</strong>
        </div>
      </div>
    </div>
  );
};

export default Tile;
