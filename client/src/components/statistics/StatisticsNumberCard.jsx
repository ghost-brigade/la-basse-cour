const StatiticsNumberCard = (props) => {
    const evolution = Number(
        (props.value.actual / (
            props.value.previous === 0 ? 1 : props.value.previous
        ))
        .toFixed(1));
    const positiveEvolution = evolution >= 0;

    return (
        <div className="app_card app_card-colored">
            <h2>{props.title}</h2>
            <h3 className="app_statistics-evolution">{props.value.actual}{props.value.unit} {
                props.value.previous !== null
                    ? <span className={`app_statistics-${positiveEvolution ? 'positive' : 'negative'}`}>
                        {positiveEvolution ? '+' : '-'}{Math.abs(evolution)}% <i className={`fa fa-long-arrow-${positiveEvolution ? 'up' : 'down'}`}></i>
                    </span>
                    : ''
                }
            </h3>
            {
                props.value.previous !== null ? <p className="indicator">Comparé à {props.value.previous}{props.value.unit} hier</p> : ''
            }
        </div>
    )
}

export default StatiticsNumberCard;