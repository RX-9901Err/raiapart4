const db = supabase.createClient(
  "https://npbhyyvxwzjrwqdacflv.supabase.co/rest/v1/",
   "sb_publishable_-oPDCWkyN4YePi7IruFLTQ_6nR3kcDd"


);

async function simpan() {
  const text = document.getElementById("note").value;

  await db
    .from("notes")
    .insert({ text });

  tampilkan();
}

async function tampilkan() {
  const { data } = await db
    .from("notes")
    .select("*");

  document.getElementById("list").innerHTML =
    data.map(note => `<li>${note.text}</li>`).join("");
}

tampilkan();
