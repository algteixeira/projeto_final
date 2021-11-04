const serialize = ({_id, modelo, cor, ano, acessorios}) => {
    return {_id, modelo, cor, ano, acessorios};
}

const serializeAllCars = ({docs, limit, totalDocs, pagingCounter, totalPages}) => {
    return {
        veiculos: docs.map(serialize),
        total: totalDocs,
        limit,
        offset: pagingCounter,
        offsets: totalPages
    };

};

module.exports = {serialize, serializeAllCars};
