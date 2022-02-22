import { GetStaticPaths, GetStaticProps } from "next";
import { EmbeddedElement, Image, Viewer } from '@link-u/ginzan'
import { Proto } from "../../../../../api/protocol";
import { makeDummyChapter } from "../../../../../mock/model/chapter";
import React from "react";

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params.chapter_id as string
    const dummy: Proto.ViewerView = {
        imageUrls: [1,2,3,4,5,6,7,8].map(p => ("https://placehold.jp/360x540.png?text=" + p)),
        chapter: makeDummyChapter(Number(id))
    }
    return {
        props: {
            data: dummy
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    }
}

export default function ViewerView(props: {
    data: Proto.ViewerView
}) {
    const pages: (Image | EmbeddedElement)[] = props.data?.imageUrls?.map(p => {
        let pa: Image 
        if (p) pa = {
            src: p,
            type: "image"
        }
        return pa
    })
    if (props.data === null || props.data === undefined) return null
    return (
        <div>
            <div>
            <Viewer
                src={pages}
                breakpoint={{type: "ratio", value: 1}}
                centerizeFirstPage={false}
            />
            </div>
        </div>
    )
}