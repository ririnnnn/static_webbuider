import { useEditor } from "@craftjs/core";
function EditorTopBar(props) {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  return (
    <div className="h-8 bg-palete-1 inline-block text-white text-center">
      <span>{props.text}</span>
      <div className="w-fit inline-block float-end items-center">
        <button
          className="border-black px-2 bg-green-700 text-white rounded justify-center"
          onClick={() => {
            console.log(query.serialize());
          }}
        >
          Save
        </button>
        <button
          className="border-black px-2 bg-green-700 text-white rounded justify-center"
          onClick={() => {
            actions.deserialize(
              '{"ROOT":{"type":"div","isCanvas":true,"props":{},"displayName":"div","custom":{},"hidden":false,"nodes":["n7XzdCzhJ7","JRT4k_FNvh","OqLQrmFrsu","tSpU5Qh3xx"],"linkedNodes":{}},"YxqFdfmQgW":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"text1"},"displayName":"Text","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"XrtwtXl5cd":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"text2"},"displayName":"Text","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"LX1iQTl6_-":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"text3"},"displayName":"Text","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"3kFNNkFCcc":{"type":{"resolvedName":"Section"},"isCanvas":true,"props":{},"displayName":"PageSection","custom":{},"parent":"ROOT","hidden":false,"nodes":["mjzqZH5Z3J","-rhc1F2vbP"],"linkedNodes":{}},"mjzqZH5Z3J":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"aaa"},"displayName":"Text","custom":{},"parent":"3kFNNkFCcc","hidden":false,"nodes":[],"linkedNodes":{}},"-rhc1F2vbP":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"bbb"},"displayName":"Text","custom":{},"parent":"3kFNNkFCcc","hidden":false,"nodes":[],"linkedNodes":{}},"n7XzdCzhJ7":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"text1","textColor":"#000000"},"displayName":"Text","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"JRT4k_FNvh":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"text2","textColor":"#66ff77"},"displayName":"Text","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"OqLQrmFrsu":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"text3","textColor":"#000000"},"displayName":"Text","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"tSpU5Qh3xx":{"type":{"resolvedName":"Section"},"isCanvas":true,"props":{},"displayName":"PageSection","custom":{},"parent":"ROOT","hidden":false,"nodes":["4W9v1tV5H1","mqeOzjj3bf","ojSciOelPQ"],"linkedNodes":{}},"4W9v1tV5H1":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"aaa","textColor":"#000000"},"displayName":"Text","custom":{},"parent":"tSpU5Qh3xx","hidden":false,"nodes":[],"linkedNodes":{}},"ojSciOelPQ":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"bbb","textColor":"#000000"},"displayName":"Text","custom":{},"parent":"tSpU5Qh3xx","hidden":false,"nodes":[],"linkedNodes":{}},"mqeOzjj3bf":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"new!!!","textColor":"#FFF000"},"displayName":"Text","custom":{},"parent":"tSpU5Qh3xx","hidden":false,"nodes":[],"linkedNodes":{}}}'
            );
          }}
        >
          Load
        </button>
      </div>
    </div>
  );
}
export default EditorTopBar;
