import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useForm, ErrorMessage } from "react-hook-form";
import axios from "axios";

import Flash from "../utils/flash";
import Layout from "../components/layout";
import { stringToSlug } from "../utils/commonfunctions";
import { addPost, deletePost } from "../redux/actions/postActions";

function Tutorials(props) {
	console.count("tutorial");
	const { errors, register, handleSubmit, reset } = useForm();
	const dispatch = useDispatch();
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const postErr = useSelector((state) => state.errors);
	let { posts } = useSelector((state) => state.post);
	if (posts === null) posts = props.posts;

	// console.log(posts);

	const { push } = useRouter();

	// if (!isAuthenticated) push("/login");

	React.useEffect(() => {
		postErr && window.flash(postErr.connectionErr);
	}, [postErr]);

	function savePost(e) {
		// console.log(e);
		e.slug = stringToSlug(e.title);
		dispatch(addPost(e, reset));
	}

	function removeFeed(postId) {
		if (window.confirm("Do you want to remove this feed ?")) {
			dispatch(deletePost(postId));
		}
	}

	function deleteOption(post) {
		if (user.id === post.User.id) {
			return (
				<button
					type="submit"
					onClick={() => removeFeed(post.id)}
					className="btn btn-danger"
				>
					Delete
				</button>
			);
		}
	}

	let postFeed;
	if (posts.length >= 1) {
		postFeed = posts.map((post) => {
			return (
				<div key={post.id} className="row" style={{ marginBottom: "50px" }}>
					<div className="col-md-2">
						<Link href={`/profile/${post.User.Profile.handle}`}>
							<a>
								<img
									className="rounded-circle d-none d-md-block"
									src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
									alt=""
								/>
							</a>
						</Link>
						<br />
						<p className="text-center">{post.User.name}</p>
					</div>
					<div className="col-md-10">
						<h3 className="card-title">{post.title}</h3>
						<p className="lead">{post.content.slice(0, 250)}</p>
						<button type="button" className="btn btn-light mr-1">
							<i className="text-info fas fa-thumbs-up"></i>
							<span className="badge badge-light">{post.likesCount}</span>
						</button>
						<Link href="/tutorial/[slug]" as={`/tutorial/${post.slug}`}>
							<a className="btn btn-info mr-1">
								Comments - ({post.commentsCount})
							</a>
						</Link>
						{deleteOption(post)}
					</div>
				</div>
			);
		});
	} else {
		postFeed = (
			<div className="row justify-content-center">
				<i className={`alert alert-warning`}>
					Sorry no tutorials to enlighten you !
				</i>
			</div>
		);
	}

	let postBox;
	if (!isAuthenticated) {
		postBox = "";
	} else {
		postBox = (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">
						What's on your mind ...
					</div>
					<div className="card-body">
						<form onSubmit={handleSubmit(savePost)}>
							<div className="form-group">
								<input
									ref={register({ required: "Please enter a title" })}
									className="form-control form-control-lg"
									placeholder="Post Title"
									name="title"
								/>
								<ErrorMessage
									errors={errors}
									name="title"
									as="i"
									className="alert-danger"
								/>
								<br />
								<i className="alert-danger">
									{postErr !== null ? postErr.title : ""}
								</i>

								<textarea
									ref={register({
										required: "Please enter something to post",
									})}
									className="form-control form-control-lg"
									placeholder="Post Content"
									name="content"
								></textarea>
								<ErrorMessage
									errors={errors}
									name="content"
									className="alert-danger"
									as="i"
								/>
								<br />
								<i className="alert-danger">
									{postErr !== null ? postErr.content : ""}
								</i>
							</div>
							<button type="submit" className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}

	return (
		<Layout title="Articles | Dev Zilla">
			<div className="row">
				<div className="col-md-12">
					{postBox}
					<div className="posts">
						<div className="card card-body mb-3">{postFeed}</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

// Next.js will pre-render this page at build time using the props returned by getStaticProps.
export async function getServerSideProps(ctx) {
	let res = {};
	// console.log(ctx.req.headers);
	const axioscfg = ctx.req ? { baseURL: `http://${ctx.req.headers.host}` } : {};
	res = await axios.get(`/api/posts`, axioscfg);
	return {
		props: { posts: res.data }, // will be passed to the page component as props
	};
}

export default React.memo(Tutorials);
