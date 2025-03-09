import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import supabase from '../../supabaseClient'; // Ensure the correct path to your supabaseClient

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();

    const subscription = supabase
      .channel('public:forum_posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'forum_posts' }, payload => {
        setPosts(currentPosts => [payload.new, ...currentPosts]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchPosts = async () => {
    setRefreshing(true);
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else if (data) {
      setPosts(data);
    }
    setRefreshing(false);
  };

  const handleAddPost = async () => {
    if (!title || !content) return;

    const { data, error } = await supabase
      .from('forum_posts')
      .insert([{ title, content }])
      .single();

    if (error) {
      console.error('Error adding post:', error);
    } else if (data) {
      setPosts([data, ...posts]); // Update state immediately with new post
      setTitle('');
      setContent('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Add Post" onPress={handleAddPost} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={fetchPosts}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
            <Text style={styles.postDate}>{new Date(item.created_at).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  post: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 16,
  },
  postDate: {
    fontSize: 12,
    color: 'gray',
  },
});

export default ForumPage;
