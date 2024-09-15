import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

const INITIAL_STATE = {
  currentBookmark: {},
  bookmarks: [],
  isLoading: false,
  error: null,
};

const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "bookmarks/loaded":
      return { ...state, isLoading: false, bookmarks: action.payload };
    case "bookmark/loaded":
      return { ...state, isLoading: false, currentBookmark: action.payload };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark: null,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
};
export default function BookmarkListProvider({ children }) {
  const [state, dispatch] = useReducer(bookmarkReducer, INITIAL_STATE);
  const { currentBookmark, bookmarks, isLoading } = state;

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({
          type: "rejected",
          payload: "an Errror occurred in loading bookmarks",
        });
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    //! for optimazation
    if (Number(id) === currentBookmark?.id) return;

    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "an Errror occurred in loading bookmarks",
      });
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      toast.success("Bookmark deleted successfully");
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      toast.success("Bookmark created successfully");
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        currentBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error(
      "BookmarkContext was used outside of a BookmarkListProvider"
    );
  }
  return context;
};
