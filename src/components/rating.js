import React from 'react';

export default function Rating() {
    return (
        <div className="rating">
            <fieldset className="rating-fieldset">
                <legend>Avaliação</legend>
                <input type="radio" id="rating-1" className="star" name="star" value="1" />
                <label htmlFor="rating-1"></label>
                <input type="radio" id="rating-2" className="star" name="star" value="2" />
                <label htmlFor="rating-2"></label>
                <input type="radio" id="rating-3" className="star" name="star" value="3" />
                <label htmlFor="rating-3" ></label>
                <input type="radio" id="rating-4" className="star" name="star" value="4" />
                <label htmlFor="rating-4" ></label>
                <input type="radio" id="rating-5" className="star" name="star" value="5" />
                <label htmlFor="rating-5" ></label>
            </fieldset>
        </div>
    )
}
