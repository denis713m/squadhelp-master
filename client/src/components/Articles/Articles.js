import React from 'react';
import styles from "./Articles.module.sass";
import articles from "../../articles";

const Articles = () => {
    return (
        <div className={styles.articlesMainContainer}>
            <div className={styles.ColumnContainer}>
                {articles.filter((article, index) => index < 2)
                    .map((article, index) => {
                            return (
                                <article key={`article${index}`}>
                                    <h4 className={styles.headerArticle}>{article.title}</h4>
                                    <p className={styles.article}>
                                        {article.body}
                                    </p>
                                </article>)
                    }
                )}
            </div>
            <div className={styles.ColumnContainer}>
                {articles.filter((article, index) => index >= 2)
                    .map((article, index) => {
                            return (
                                <article  key={`article${index}`}>
                                    <h4 className={styles.headerArticle}>{article.title}</h4>
                                    <p className={styles.article}>
                                        {article.body}
                                    </p>
                                </article>)
                    }
                )}
            </div>
        </div>
    );
};

export default Articles;