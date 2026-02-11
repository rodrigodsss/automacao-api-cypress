// ***********************************************
// Custom Commands para API
// ***********************************************

// Comando para fazer GET
Cypress.Commands.add('getObject', (id) => {
  return cy.request({
    method: 'GET',
    url: `https://api.restful-api.dev/objects/${id}`
  })
})

// Comando para fazer GET de todos
Cypress.Commands.add('getAllObjects', () => {
  return cy.request({
    method: 'GET',
    url: 'https://api.restful-api.dev/objects'
  })
})

// Comando para fazer GET por múltiplos IDs
Cypress.Commands.add('getObjectsByIds', (ids) => {
  const queryString = ids.map(id => `id=${id}`).join('&')
  return cy.request({
    method: 'GET',
    url: `https://api.restful-api.dev/objects?${queryString}`
  })
})

// Comando para criar objeto (POST)
Cypress.Commands.add('createObject', (deviceData) => {
  return cy.request({
    method: 'POST',
    url: 'https://api.restful-api.dev/objects',
    body: deviceData
  })
})

// Comando para atualizar objeto (PUT)
Cypress.Commands.add('updateObject', (id, deviceData) => {
  return cy.request({
    method: 'PUT',
    url: `https://api.restful-api.dev/objects/${id}`,
    body: deviceData
  })
})

// Comando para deletar objeto (DELETE)
Cypress.Commands.add('deleteObject', (id) => {
  return cy.request({
    method: 'DELETE',
    url: `https://api.restful-api.dev/objects/${id}`
  })
})

// Comando para validar estrutura padrão de objeto
Cypress.Commands.add('validateObjectStructure', (object) => {
  expect(object).to.exist.and.be.an('object')
  expect(object).to.have.property('id').and.be.a('string')
  expect(object).to.have.property('name').and.be.a('string')
  expect(object).to.have.property('data')
  
  if (object.data !== null) {
    expect(object.data).to.be.an('object')
  }
})
