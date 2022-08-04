export type RawPost = {
  _id: string
  _createdAt: string
  title: string
  author: {
    image: {
      asset: {
        _ref: string
      },
    },
    name: string
  }
  description: string
  mainImage: {
    asset: {
      _ref: string
    }
  }
  slug: {
    current: string
  }
  body: object[]
}

export type Post = {
  id: string
  createdAt: string
  title: string
  authorName: string
  authorImage: string
  description: string
  mainImageUrl: string
  slug: string
  body: object[]
}

export type PostShort = {
  id: string
  title: string
  authorName: string
  authorImage: string
  mainImageUrl: string
  description: string
  slug: string
}


export type Comment = {
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    _ref: string
    _type: string
  }
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}
