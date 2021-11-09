const serialize = ({_id, nome, cnpj, atividades, endereco, __v}) => {
    return {_id, nome, cnpj, atividades, endereco};
}

const serializeAllRental = ({docs, limit, totalDocs, pagingCounter, totalPages}) => {
    return {
        locadoras: docs.map(serialize),
        total: totalDocs,
        limit,
        offset: pagingCounter,
        offsets: totalPages
    };

};

module.exports = {serialize, serializeAllRental};
