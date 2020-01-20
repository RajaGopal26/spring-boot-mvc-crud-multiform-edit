package net.codejava;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductService {

	@Autowired
	private ProductRepository repo;
	
	public List<Product> listAll() {
		return repo.findAll();
	}
	
	public void save(Product product) {
		repo.save(product);
	}
	
	public Product get(long id) {
		return repo.findById(id).get();
	}
	
	public void delete(long id) {
		repo.deleteById(id);
	}

	public void update(Product product) {
		if(product.getId()!=null) {
			Optional<Product> optProd = repo.findById(product.getId());
			if(optProd.isPresent()) {
				Product productEntity = optProd.get();
				if(product.getName()!=null)
					productEntity.setName(product.getName());
				if(product.getBrand()!=null)
					productEntity.setBrand(product.getBrand());
				if(product.getMadein()!=null)
					productEntity.setMadein(product.getMadein());
				if(product.getPrice()!=0.0)
					productEntity.setPrice(product.getPrice());
				save(productEntity);
			}
		}
		else {
			System.out.println("Product code is missing!!!");
		}
		
	}
}
