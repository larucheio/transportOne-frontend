export default function ({ store, redirect }) {
  if (!store.getters.isAdmin) {
    return redirect('/auth/sign-in')
  }
}
