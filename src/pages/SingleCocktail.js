import React, { useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useCallback } from "react";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  const fetchDrink = useCallback(async () => {
    try {
      setLoading(true);
      const resp = await axios(`${url}${id}`);
      const { drinks } = resp.data;

      if (drinks) {
        const singleDrink = drinks.map((item) => {
          const {
            strCategory,
            strDrink,
            strAlcoholic,
            strDrinkThumb,
            strGlass,
            strInstructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = item;

          return {
            category: strCategory,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
            instruction: strInstructions,
            ingredient: [
              strIngredient1,
              strIngredient2,
              strIngredient3,
              strIngredient4,
              strIngredient5,
            ],
          };
        });

        setCocktail(singleDrink[0]);
        setLoading(false);
      } else {
        setCocktail(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    fetchDrink();
  }, [id, fetchDrink]);

  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to found</h2>;
  }
  const { name, image, category, glass, info, instruction, ingredient } =
    cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instruction :</span>
            {instruction}
          </p>
          <p>
            <span className="drink-data">name :</span>
            {ingredient.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
