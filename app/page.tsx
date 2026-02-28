"use client";

import { useEffect, useMemo, useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string | null;
  focus_area: string | null;
  created_at: string;
};

type FileRow = {
  id: string;
  project_id: string;
  filename: string;
  mime_type: string;
  status: string;
  created_at: string;
};

type Analysis = {
  summary: string;
  key_takeaways: string[];
  tags: string[];
  suggested_next_steps: string[];
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [files, setFiles] = useState<FileRow[]>([]);
  const [analysisByFileId, setAnalysisByFileId] = useState<
    Record<string, Analysis>
  >({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [focusArea, setFocusArea] = useState("");

  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId) ?? null,
    [projects, activeProjectId]
  );

  async function fetchProjects() {
    // This requires GET support on /api/projects
    const res = await fetch("/api/projects");
    if (!res.ok) return;
    const json = await res.json();
    setProjects(json.projects ?? []);
  }

  async function fetchFiles(projectId: string) {
    // This requires GET support on /api/project-files?projectId=...
    const res = await fetch(`/api/project-files?projectId=${projectId}`);
    if (!res.ok) return;
    const json = await res.json();
    setFiles(json.files ?? []);
  }

  useEffect(() => {
    fetchProjects().catch(() => {});
  }, []);

  useEffect(() => {
    if (activeProjectId) fetchFiles(activeProjectId).catch(() => {});
  }, [activeProjectId]);

  function flash(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  }

  async function createProject(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          focus_area: focusArea.trim(),
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? `Failed to create project`);
      }

      const json = await res.json();
      const project = json.project;
      setProjects((prev) => [project, ...prev]);
      setActiveProjectId(project.id);

      setTitle("");
      setDescription("");
      setFocusArea("");

      flash("Project created.");
    } catch (err: any) {
      flash(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function uploadFile(e: React.FormEvent) {
    e.preventDefault();
    if (!activeProjectId) return flash("Choose a project first.");
    if (!fileToUpload) return flash("Choose a file to upload.");

    setLoading(true);

    try {
      const form = new FormData();
      form.set("projectId", activeProjectId);
      form.set("file", fileToUpload);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Upload failed.");
      }

      const json = await res.json();
      const file = json.file as FileRow;

      setFiles((prev) => [file, ...prev]);
      setFileToUpload(null);

      flash("Uploaded.");
    } catch (err: any) {
      flash(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function analyze(fileId: string) {
    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_id: fileId }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Analyze failed.");
      }

      const json = await res.json();
      const analysis = json.analysis as Analysis;

      setAnalysisByFileId((prev) => ({ ...prev, [fileId]: analysis }));

      // update status locally
      setFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, status: "ready" } : f))
      );

      flash("Analysis complete.");
    } catch (err: any) {
      flash(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold text-black mb-2">
          Creativity Coach MVP
        </h1>
        <p className="text-zinc-700 mb-6">
          Figma is the design. Vercel shows your code. This page is the
          simplest working test: create a project → upload a file → analyze.
        </p>

        {notice ? (
          <div className="mb-6 rounded border border-zinc-300 bg-white p-3 text-sm">
            {notice}
          </div>
        ) : null}

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded border border-zinc-200 bg-white p-4">
            <h2 className="text-lg font-medium text-black mb-3">
              1) Create a project
            </h2>

            <form className="space-y-3" onSubmit={createProject}>
              <div>
                <label className="block text-sm text-zinc-700 mb-1">
                  Title
                </label>
                <input
                  className="w-full rounded border border-zinc-300 px-2 py-1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Week 1 / Daily prompt / My skill track"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-700 mb-1">
                  Focus area (optional)
                </label>
                <input
                  className="w-full rounded border border-zinc-300 px-2 py-1"
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  placeholder="Satire / Worldbuilding / Script"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  className="w-full rounded border border-zinc-300 px-2 py-1"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What this project is about, or what 'progress' looks like."
                />
              </div>

              <button
                disabled={loading}
                className="w-full rounded bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                Create project
              </button>
            </form>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-black mb-2">
                Projects
              </h3>

              <div className="space-y-2">
                {projects.length === 0 ? (
                  <div className="text-sm text-zinc-600">
                    No projects yet.
                  </div>
                ) : (
                  projects.map((p) => (
                    <button
                      key={p.id}
                      className={`w-full rounded border border-zinc-300 px-2 py-2 text-left text-sm ${
                        activeProjectId === p.id ? "bg-zinc-100" : "bg-white"
                      }`}
                      onClick={() => setActiveProjectId(p.id)}
                    >
                      <div className="font-medium text-black">
                        {p.title}
                      </div>
                      {p.focus_area ? (
                        <div className="text-xs text-zinc-600">
                          Focus: {p.focus_area}
                        </div>
                      ) : null}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="rounded border border-zinc-200 bg-white p-4">
            <h2 className="text-lg font-medium text-black mb-3">
              2) Upload + Analyze
            </h2>

            <div className="mb-3 text-sm">
              Active project:{" "}
              <span className="font-medium">
                {activeProject ? activeProject.title : "none selected"}
              </span>
            </div>

            <form className="space-y-3" onSubmit={uploadFile}>
              <div>
                <input
                  type="file"
                  onChange={(e) => setFileToUpload(e.target.files?.[0] ?? null)}
                />
              </div>

              <button
                disabled={loading}
                className="w-full rounded bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                Upload file
              </button>
            </form>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-black mb-2">Files</h3>

              {files.length === 0 ? (
                <div className="text-sm text-zinc-600">
                  Upload a file to see it here.
                </div>
              ) : (
                <div className="space-y-3">
                  {files.map((f) => {
                    const analysis = analysisByFileId[f.id];
                    return (
                      <div
                        key={f.id}
                        className="rounded border border-zinc-200 p-3"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="text-sm font-medium text-black">
                            {f.filename}
                          </div>

                          <button
                            disabled={loading}
                            className="rounded bg-zinc-900 px-2 py-1 text-xs font-medium text-white disabled:opacity-50"
                            onClick={() => analyze(f.id)}
                          >
                            Analyze
                          </button>
                        </div>

                        <div className="mt-1 text-xs text-zinc-600">
                          {f.mime_type} • status: {f.status}
                        </div>

                        {analysis ? (
                          <div className="mt-3 space-y-1 text-sm">
                            <div className="font-medium text-black">
                              Summary:
                            </div>
                            <div className="text-zinc-700">
                              {analysis.summary}
                            </div>

                            <div className="font-medium text-black mt-2">
                              Tags:
                            </div>
                            <div className="text-zinc-700">
                              {analysis.tags.join(", ")}
                            </div>

                            <div className="font-medium text-black mt-2">
                              Key takeaways:
                            </div>
                            <ul className="list-disc pl-5 text-zinc-700">
                              {analysis.key_takeaways.map((t, i) => (
                                <li key={i}>{t}</li>
                              ))}
                            </ul>

                            <div className="font-medium text-black mt-2">
                              Next steps:
                            </div>
                            <ul className="list-disc pl-5 text-zinc-700">
                              {analysis.suggested_next_steps.map((t, i) => (
                                <li key={i}>{t}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
