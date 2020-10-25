const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((s, b) => s + b.likes, 0)
}

const favoriteBlog  = (blogs) => {
  const bestBlog = blogs.reduce(
    (top, blog) => blog.likes > top.likes ? blog : top,
    { title: '',
      author: '',
      likes: 0 }
  )
  return {
    title: bestBlog.title,
    author: bestBlog.author,
    likes: bestBlog.likes,
  }
}

const mostBlogs  = (blogs) => {
  const authors = blogs.reduce((count, blog) => {
    count[blog.author] = count[blog.author] ? count[blog.author] + 1 : 1
    return count
  }, {})
  return Object
    .entries(authors)
    .reduce(
      (most, [ author, works ]) => most.blogs < works ? { author: author, blogs: works } : most,
      { author: undefined, blogs: 0 }
    )
}

const mostLikes  = (blogs) => {
  const authors = blogs.reduce((count, blog) => {
    count[blog.author] = count[blog.author] ? count[blog.author] + blog.likes : blog.likes
    return count
  }, {})
  return Object
    .entries(authors)
    .reduce(
      (most, [ author, likes ]) => most.likes < likes ? { author: author, likes: likes } : most,
      { author: undefined, likes: 0 }
    )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
