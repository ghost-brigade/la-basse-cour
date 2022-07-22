const SearchFilters = (props) => {
    const handleChangeValues = (event) => {
        const { id, value } = event.target;
        props.handleChangeValue(id, value);
    }

    return (
        <>
            {
                props.filters.map((filter) => <div key={`filter_${filter.id}`} className="form-group">
                    <label htmlFor={filter.id}>{filter.label}</label>
                    {
                        filter.type === 'select'
                        ? <select 
                            id={filter.id} 
                            name={filter.id} 
                            className="form-control"
                            defaultValue={filter.defaultValue}
                            onChange={handleChangeValues}
                        >
                            <option>{filter.placeholder}</option>
                            {filter.options.map(option => <option 
                                key={`${filter.id}_option_${option.value}`} 
                                value={option.value}
                            >
                                {option.label}
                            </option>
                            )}
                        </select>
                        : <input 
                            id={filter.id} 
                            name={filter.id} 
                            type={filter.type} 
                            value={props.values[filter.id]}
                            placeholder={filter.placeholder ? filter.placeholder : filter.label}
                            className="form-control"
                            onChange={handleChangeValues}
                        />
                    }
                </div>)
            }
            {props.children}
        </>
    );
}

export default SearchFilters;