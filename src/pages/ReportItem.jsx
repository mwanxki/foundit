import { useState, useEffect } from "react";
import { searchPlaces } from "../utils/geoapify";
import { categories } from "../data/mockData";

function ReportItem() {
  const [form, setForm] = useState({
    reportType: "lost", itemName: "", category: "", description: "", date: "",
  });
  const [photo, setPhoto] = useState("");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(null); // { name, lat, lon }
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handlePhoto(e) {
    const file = e.target.files[0];
    setPhoto(file ? URL.createObjectURL(file) : "");
  }

  useEffect(() => {
    if (query.length < 3 || location?.name === query) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      setApiError("");
      try {
        setSuggestions(await searchPlaces(query));
      } catch (err) {
        setApiError(err.message);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query, location]);

  function pickPlace(place) {
    setLocation(place);
    setQuery(place.name);
    setSuggestions([]);
  }

  function validate() {
    const e = {};
    if (!form.itemName.trim()) e.itemName = "Item name is required";
    if (!form.category) e.category = "Choose a category";
    if (form.description.trim().length < 10) e.description = "Add at least 10 characters";
    if (!form.date) e.date = "Pick a date";
    if (!location) e.location = "Pick a location from the list";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    const newItem = { ...form, location, photo, status: "active" };
    console.log("New report:", newItem); // no backend in Phase 1
    setSubmitted(true);
  }

  if (submitted) return <p>Your report was submitted. Thank you!</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Report an item</h1>

      <label>
        <input type="radio" name="reportType" value="lost"
          checked={form.reportType === "lost"} onChange={handleChange} /> Lost
      </label>
      <label>
        <input type="radio" name="reportType" value="found"
          checked={form.reportType === "found"} onChange={handleChange} /> Found
      </label>

      <label>Item name
        <input name="itemName" value={form.itemName} onChange={handleChange} />
      </label>
      {errors.itemName && <p className="error">{errors.itemName}</p>}

      <label>Category
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select...</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      {errors.category && <p className="error">{errors.category}</p>}

      <label>Description
        <textarea name="description" value={form.description} onChange={handleChange} />
      </label>
      {errors.description && <p className="error">{errors.description}</p>}

      <label>Date
        <input type="date" name="date" value={form.date} onChange={handleChange} />
      </label>
      {errors.date && <p className="error">{errors.date}</p>}

      <label>Location
        <input value={query}
          onChange={(e) => { setQuery(e.target.value); setLocation(null); }}
          placeholder="Start typing a place..." />
      </label>
      {loading && <p>Searching...</p>}
      {apiError && <p className="error">{apiError}</p>}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((s) => (
            <li key={s.name} onClick={() => pickPlace(s)}>{s.name}</li>
          ))}
        </ul>
      )}
      {errors.location && <p className="error">{errors.location}</p>}

      <label>Photo (optional)
        <input type="file" accept="image/*" onChange={handlePhoto} />
      </label>
      {photo && <img src={photo} alt="Preview" width="150" />}

      <button type="submit">Submit report</button>
    </form>
  );
}

export default ReportItem;