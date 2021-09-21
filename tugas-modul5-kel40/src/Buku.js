import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CatalogContext = createContext();
Modal.setAppElement("#root");
function Buku() {
  const [valueCatalog, setValueCatalog] = useState("A");
  return (
    <CatalogContext.Provider value={valueCatalog}>
      <div>
        <button onClick={() => setValueCatalog("A")}>Mixed Author</button>
        <button onClick={() => setValueCatalog("B")}>Haruki Murakami</button>
      </div>
      <Content />
    </CatalogContext.Provider>
  );
}

function Content() {
  return (
    <div>
      <Data />
    </div>
  );
}

// function handleButton(judul, nama, tahun) {
//   alert(`Buku ${judul} ditulis oleh ${nama} dan terbit pada tahun ${tahun}`);
// }

function Data() {
  const [buku, setBuku] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentDetail, setCurrentDetail] = useState({});
  const catalog = useContext(CatalogContext);

  function OpenModal(id, author, title, pages, releaseDate, isbn) {
    setCurrentDetail({
      id: id,
      author: author,
      title: title,
      pages: pages,
      releaseDate: releaseDate,
      isbn: isbn,
    });

    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3000/${catalog}`,
      headers: {
        accept: "/",
      },
    })
      .then((data) => {
        console.log(data.data);
        setBuku([...data.data]);
        // console.log(state.Buku)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [catalog]);

  return (
    <div>
      <Grid
        container
        spacing={3}
        style={{ marginTop: "50px", marginLeft: "10px" }}
      >
        {buku.map((result) => {
          return (
            <Grid item key={result.id} md={4}>
              <Card>
                <CardActionArea
                  onClick={() =>
                    OpenModal(
                      result.id,
                      result.author,
                      result.title,
                      result.pages,
                      result.releaseDate,
                      result.isbn
                    )
                  }
                >
                  <Typography>{result.title}</Typography>
                  <Typography>{result.pages}</Typography>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <Typography>Id: {currentDetail.id}</Typography>
          <Typography>Author: {currentDetail.author}</Typography>
          <Typography>Title: {currentDetail.title}</Typography>
          <Typography>Pages: {currentDetail.pages}</Typography>
          <Typography>Release Date: {currentDetail.releaseDate}</Typography>
          <Typography>ISBN: {currentDetail.isbn}</Typography>
        </Modal>
      </Grid>
    </div>
  );
}
export default Buku;
