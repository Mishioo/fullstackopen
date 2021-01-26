const USERNAME = "userskyuer"
const PASSWORD = "somepass"

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tester Usersky',
      username: USERNAME,
      password: PASSWORD
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains("blogs")
    cy.contains("username")
    cy.contains("password")
    cy.contains("login")
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(USERNAME)
      cy.get('#password').type(PASSWORD)
      cy.get('#login-button').click()
      cy.get('.info').contains("Welcome")
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type("wrong")
      cy.get('#password').type("wrong")
      cy.get('#login-button').click()
      cy.get('.error').contains("Invalid credentials")
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: USERNAME, password: PASSWORD })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blogFormTitle').type("blog title")
      cy.get('#blogFormAuthor').type("blog author")
      cy.get('#blogFormUrl').type("blog.url")
      cy.get('#blog-create-button').click()
      cy.get('.info').contains('New blog created')
    })

    describe.only('and several notes exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'first author', url: 'http://first.url', likes: 5 })
        cy.createBlog({ title: 'second blog', author: 'second author', url: 'http://second.url', likes: 2 })
        cy.createBlog({ title: 'third blog', author: 'third author', url: 'http://third.url', likes: 8 })
      })

      it('blog can be liked', function () {
        cy.contains('first blog').as('blog')
        cy.get('@blog').find('button').click()
        cy.get('@blog').parent().find('.likeButton').as('likeButton')
        cy.get('@likeButton').click()
        cy.get('@likeButton').parent().contains('likes 6')
      })

      it('blog can be deleted', function () {
        cy.contains('first blog').as('blog')
        cy.get('@blog').find('button').click()
        cy.get('@blog').parent().contains('remove').click()
        cy.get('@blog').should('not.exist')
      })
    })
  })
})