const CarRepository = require('../repository/CarRepository');

const NotFound = require('../errors/notFound');

const AlreadyExists = require('../errors/alreadyExists');

class CarService {
    async create(payload) {
      
      const findByModel = await CarRepository.findByModel(payload.modelo);
      if (findByModel === null) {
        const result = await CarRepository.create(payload); 
        return result;
      } else {
        throw new AlreadyExists();
      }
      
      
     
    }  
  
  async find(payload) {
    let limit, page;
    if (!payload.limit) {
      limit=100;
    } else {
      limit=payload.limit;
    }
    if (!payload.page) {
      page=1;
    } else {
      page = payload.page;
    }

    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page-1)*limit;
    if (payload.descricao) {
      
      payload['acessorios.descricao'] = payload.descricao;
      payload.descricao = undefined;
      
    }

    
  
    const result = await CarRepository.find(payload, limit, offset);
    
    return result;
  
  
  }

  async findById(payload) {
    const result = await CarRepository.findById(payload);
    if (result === null) {
      throw new NotFound();
    }
    return result;
    
  }

  async deleteCar(payload) {
    const result = await CarRepository.delete(payload);
    if (result === null) {
      throw new NotFound();
    }
    return result;

  }      


  async update (id, payload) {
    if (payload.acessorios) {
      payload.acessorios = await payload.acessorios.reduce((unique, o) => {
        if(!unique.some(obj => obj.descricao === o.descricao)) {
          unique.push(o);
        }
        return unique;
    },[])
    }    
    const result = await CarRepository.update(id, payload);
    if (result === null) {
      throw new NotFound();
    }
    return result;      
    
  } 



}

module.exports = new CarService();
