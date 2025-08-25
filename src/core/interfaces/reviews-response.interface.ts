
export interface Author_Details {
    avatar_path: string,
    name: string,
    rating: number,
    username: string
}

export interface Review {
    author: string,
    author_details: Author_Details,
    content: string,
    created_at: string,
    id: string,
    updated_at: string,
    url: string
}

export interface ReviewsResponse {
    id: number,
    page: number,
    results: Review[],
    total_pages: number,
    total_results: number
}