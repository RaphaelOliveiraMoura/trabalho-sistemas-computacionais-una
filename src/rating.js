import React from 'react'

export default function Rating() {
    return (
        <div className="rating">
            <label>
                <input type="radio" className="star" name="star" value="1" />
                <i className="star"></i>
            </label>
            <label>
                <input type="radio" className="star" name="star" value="2" />
                <i className="star"></i>
            </label>
            <label>
                <input type="radio" className="star" name="star" value="3" />
                <i className="star"></i>
            </label>
            <label>
                <input type="radio" className="star" name="star" value="4" />
                <i className="star"></i>
            </label>
            <label>
                <input type="radio" className="star" name="star" value="5" />
                <i className="star"></i>
            </label>
        </div>
    )
}
